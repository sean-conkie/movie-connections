import { GameSchema } from '@/app/types';
import { ClientSecretCredential, getBearerTokenProvider } from '@azure/identity';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI, { AzureOpenAI,  } from 'openai';
import util from 'util';

const scope = process.env.AZURE_SCOPE!;
const tenantId = process.env.AZURE_TENANT_ID!;
const clientId = process.env.AZURE_CLIENT_ID!;
const clientSecret = process.env.AZURE_CLIENT_SECRET!;
const apiVersion = process.env.OPENAI_API_VERSION!;
const azureOpenAIDeploymentName = process.env.AZURE_OPENAI_DEPLOYMENT_NAME!;
const baseURL = `${process.env.OPENAI_API_BASE!}/openai/deployments/${azureOpenAIDeploymentName}`;
const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

const prompt = `let's play a game called "movie connections" - a "movie connection" is defined as 4 movies that have a connection, it could be things like genre, year of release, famous star, etc.

You should avoid world cinema and other films that would not have had a general release. The same film must not appear in more than one connection. Try and come up with unusual or interesting connections.

Give me 4 "movie connections".`;


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {

  // const openai = new AzureOpenAI({ azureADTokenProvider, apiVersion, baseURL });
  const openai = new OpenAI({
    apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
  });

  const tools = [
    {
      type: "function" as const,
      function: {
        name: 'movie_connections',
        description: 'Submit movie connections to the game',
        parameters: {
          '$defs': {
            Connection: {
              properties: {
                connection: {
                  title: 'Connection',
                  type: 'string'
                },
                movies: {
                  items: { '$ref': '#/$defs/Movie' },
                  title: 'Movies',
                  type: 'array'
                }
              },
              required: ['connection', 'movies'],
              title: 'Connection',
              type: 'object'
            },
            Movie: {
              properties: {
                title: { title: 'Title', type: 'string' },
                year: { title: 'Year', type: 'integer' },
                summary: { title: 'Summary', type: 'string' },
                imdb_url: { title: 'Imdb Url', type: 'string' },
                poster_url: { title: 'Poster Url', type: 'string' },
              },
              required: ['title', 'year', 'summary', 'imdb_url'],
              title: 'Movie',
              type: 'object'
            }
          },
          properties: {
            connections: {
              items: { '$ref': '#/$defs/Connection' },
              title: 'Connections',
              type: 'array'
            }
          },
          required: ['connections'],
          title: 'MovieConnections',
          type: 'object'
        },
        strict: false
      }
    }
  ];

  try {
    const result = await openai.chat.completions.create({
      // model: azureOpenAIDeploymentName,
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      tools,
      tool_choice: { type: 'function', function: { name: "movie_connections"} }
    });
    console.log(util.inspect(result, false, null, true));

    if (!['tool_calls', 'stop'].includes(result.choices[0]?.finish_reason)) {
      throw new Error("Failed to call the tool");
    }

    const validation = GameSchema.safeParse(JSON.parse(result.choices[0]!.message?.tool_calls![0].function.arguments));

    if (!validation.success) {
      console.error(validation.error);
      throw new Error("Failed to validate the response");
    }

    return NextResponse.json(validation.data);
  }
  catch (error) {
    console.error(error);
    return NextResponse.json("An error occurred", { status: 500 });
  }

}