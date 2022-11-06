
export const timestampToPercentage = (timestamp:string | undefined, duration:string | undefined) => {
  //console.log(`Converting timestampTo%: ${timestamp}`);
  const percentageFloat = timestampToSeconds(timestamp)/timestampToSeconds(duration);
  const percentage = Math.floor(percentageFloat*100).toString();
  //console.log(`Percentage of hexcode: ${percentage}`)
  return `${percentage}%`;
}

export const timestampToSeconds = (timestamp:string | undefined) => {
  //console.log(`Converting timestampToSeconds: ${timestamp}`);
  let tokens: string[] = timestamp!.split(":");
  //console.log(`Parsing tokens: ${tokens}`);

  let mins: string = tokens[0];
  let seconds: string = tokens[1];
  let totalSeconds: number = parseFloat(mins) * 60 + parseFloat(seconds);
  return totalSeconds;
}
