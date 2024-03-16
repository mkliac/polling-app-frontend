export interface AppConfig {
  pollConfig: PollConfig;
}

export interface PollConfig {
  maxPollItems: number;
  maxDescriptionLength: number;
  minTitleLength: number;
  maxTitleLength: number;
  maxItemTextLength: number;
}
