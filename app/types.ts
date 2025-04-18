import { z } from "zod";

export const MovieSchema = z.object({
  title: z.string(),
  year: z.number(),
  summary: z.string(),
  imdb_url: z.string(),
  poster_url: z.string().optional(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const ConnectionSchema = z.object({
  connection: z.string(),
  movies: z.array(MovieSchema),
});

export type Connection = z.infer<typeof ConnectionSchema>;

export const GameSchema = z.object({
  connections: z.array(ConnectionSchema),
});

export type Game = z.infer<typeof GameSchema> & {
  state?: "in_progress" | "completed" | "failed";
  tries?: number;
  result?: number[];
  missed?: number[];
  movieGrid?: string[][];
  selection?: string[];
  oneAway?: boolean;
};
