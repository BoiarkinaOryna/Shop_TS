export interface SuggestionParams {
  type: 'popular' | 'new';
  limit: number;
  offset: number;
}