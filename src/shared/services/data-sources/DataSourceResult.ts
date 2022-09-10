
export type DataSourceResult<T> = {
  meta: {
    total: number;
/*     per_page: number;
    last_page: number;
    first_page: number;
    current_page: number;
    last_page_url: string | null;
    next_page_url: string | null;
    first_page_url: string | null;
    previous_page_url: string | null; */
  },
  data: T[]
}
