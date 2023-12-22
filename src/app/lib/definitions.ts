export interface User {
  id: string;
  name: string | undefined;
  email: string | undefined;
  githubId: string;
  avatar: string | undefined;
}

export type LiveblockUser = {
  name: string;
  color: string;
  picture: string;
};

export type Submission = {
  source_code: string;
  language_id: number;
  stdin: string;
  expected_output?: string;
  cpu_time_limit?: number;
  cpu_extra_time?: number;
  wall_time_limit?: number;
  memory_limit?: number;
  stack_limit?: number;
  max_processes_and_or_threads?: number;
  enable_per_process_and_thread_time_limit?: boolean;
  enable_per_process_and_thread_memory_limit?: boolean;
  max_file_size?: number;
  number_of_runs?: number;
  callback_url?: string;
  compile_only?: boolean;
  stdin_paused?: boolean;
};
