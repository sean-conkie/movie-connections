
/**
 * Props for the Spinner component.
 * 
 * @property {string} [label] - Optional label to display alongside the spinner.
 * @property {'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'} [spinner] - Type of spinner to display. Defaults to 'spinner'.
 * @property {'xs' | 'sm' | 'md' | 'lg'} [spinnerSize] - Size of the spinner. Defaults to 'md'.
 */
export type SpinnerProps = {
  label?: string
  spinner?: 'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg'
}

const spinnerMap: Record<NonNullable<SpinnerProps['spinner']>, string> = {
  spinner: 'loading-spinner',
  dots: 'loading-dots',
  ring: 'loading-ring',
  ball: 'loading-ball',
  bars: 'loading-bars',
  infinity: 'loading-infinity',
}

const spinnerSizeMap: Record<NonNullable<SpinnerProps['spinnerSize']>, string> = {
  xs: 'loading-xs',
  sm: 'loading-sm',
  md: 'loading-md',
  lg: 'loading-lg',
}

const labelSize: Record<NonNullable<SpinnerProps['spinnerSize']>, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-md',
  lg: 'text-lg',
}

const Spinner = ({ label, spinner, spinnerSize }: SpinnerProps) => {

  const classes = ['loading']

  if (spinner) classes.push(spinnerMap[spinner])
  if (spinnerSize) classes.push(spinnerSizeMap[spinnerSize])

  const labelClasses = ['font-semibold']
  if (spinnerSize) labelClasses.push(labelSize[spinnerSize])

  return (
    <div className='flex justify-center items-center gap-4 text-slate-400'>
      {label && <span className={labelClasses.join(' ')}>{label}</span>}
      <span aria-label={label||'loading'} className={classes.join(' ')} />
    </div>
  )
}

export default Spinner