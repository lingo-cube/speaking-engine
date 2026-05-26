export interface ApiTopic {
  id: number;
  code: string;
  category: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface ApiQuestion {
  id: number;
  topic_code: string;
  question: string;
  type: string;
  framework: string;
  created_at: string;
  updated_at: string;
}

export interface ApiAnswer {
  id: number;
  question_id: number;
  created_at: string;
  updated_at: string;
}

export interface ApiChunk {
  id: number;
  answer_id: number;
  order: number;
  paragraph: number;
  text: string;
  audio_url: string;
  created_at: string;
  updated_at: string;
}

export interface AnswerWithChunks {
  answer: ApiAnswer;
  chunks: ApiChunk[];
}
