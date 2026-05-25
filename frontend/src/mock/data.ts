export interface Topic {
  id: number;
  code: string;
  category: string;
  name: string;
}

export interface Question {
  id: number;
  topic_code: string;
  question: string;
  type: string;
  framework: string;
}

export interface Chunk {
  id: number;
  answer_id: number;
  order: number;
  text: string;
  audio_url: string;
}

export interface Answer {
  id: number;
  question_id: number;
  chunks: Chunk[];
}

const MOCK_AUDIO = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export const mockTopics: Topic[] = [
  { id: 1, code: 'hometown', category: 'ielts', name: 'Hometown' },
  { id: 2, code: 'school', category: 'ielts', name: 'School' },
  { id: 3, code: 'work', category: 'ielts', name: 'Work' },
  { id: 4, code: 'technology', category: 'ielts', name: 'Technology' },
  { id: 5, code: 'friends', category: 'ielts', name: 'Friends' },
];

export const mockQuestions: Question[] = [
  { id: 1, topic_code: 'hometown', question: 'Please describe your hometown.', type: 'Description', framework: 'Fact → Example → Highlight' },
  { id: 2, topic_code: 'hometown', question: 'What do you like most about your hometown?', type: 'Preference', framework: 'Opinion → Reason → Example' },
  { id: 3, topic_code: 'hometown', question: 'Has your hometown changed much in recent years?', type: 'Comparison', framework: 'Past → Present → Reflection' },
  { id: 4, topic_code: 'school', question: 'Describe the school you attended.', type: 'Description', framework: 'Fact → Example → Highlight' },
  { id: 5, topic_code: 'school', question: 'What was your favorite subject at school?', type: 'Preference', framework: 'Opinion → Reason → Example' },
  { id: 6, topic_code: 'school', question: 'How has education changed since you were in school?', type: 'Comparison', framework: 'Past → Present → Reflection' },
  { id: 7, topic_code: 'work', question: 'What do you do for a living?', type: 'Description', framework: 'Fact → Example → Highlight' },
  { id: 8, topic_code: 'work', question: 'What do you enjoy most about your job?', type: 'Preference', framework: 'Opinion → Reason → Example' },
  { id: 9, topic_code: 'work', question: 'How has your career path evolved over time?', type: 'Comparison', framework: 'Past → Present → Reflection' },
  { id: 10, topic_code: 'technology', question: 'How has technology changed the way people communicate?', type: 'Comparison', framework: 'Past → Present → Reflection' },
  { id: 11, topic_code: 'technology', question: 'What is your favorite piece of technology?', type: 'Preference', framework: 'Opinion → Reason → Example' },
  { id: 12, topic_code: 'technology', question: 'Do you think technology has made life easier or more complicated?', type: 'Opinion', framework: 'Opinion → Reason → Example' },
  { id: 13, topic_code: 'friends', question: 'How do you usually make new friends?', type: 'Description', framework: 'Fact → Example → Highlight' },
  { id: 14, topic_code: 'friends', question: 'What qualities do you value most in a friend?', type: 'Preference', framework: 'Opinion → Reason → Example' },
  { id: 15, topic_code: 'friends', question: 'Has your idea of friendship changed as you have grown older?', type: 'Comparison', framework: 'Past → Present → Reflection' },
];

export const mockAnswers: Record<number, Answer> = {
  1: {
    id: 1,
    question_id: 1,
    chunks: [
      { id: 1, answer_id: 1, order: 1, text: 'I come from Wuhan, which is a big city in central China.', audio_url: MOCK_AUDIO },
      { id: 2, answer_id: 1, order: 2, text: 'There are many tourist attractions there.', audio_url: MOCK_AUDIO },
      { id: 3, answer_id: 1, order: 3, text: 'Particularly East Lake, it is quiet and serene.', audio_url: MOCK_AUDIO },
    ],
  },
  2: {
    id: 2,
    question_id: 2,
    chunks: [
      { id: 4, answer_id: 2, order: 1, text: 'What I like most about my hometown is the vibrant food culture.', audio_url: MOCK_AUDIO },
      { id: 5, answer_id: 2, order: 2, text: 'There are countless street food stalls and restaurants serving delicious local cuisine.', audio_url: MOCK_AUDIO },
      { id: 6, answer_id: 2, order: 3, text: 'For example, Wuhan is famous for its hot dry noodles, which are a breakfast staple.', audio_url: MOCK_AUDIO },
      { id: 7, answer_id: 2, order: 4, text: 'I really miss the food whenever I am away from home.', audio_url: MOCK_AUDIO },
    ],
  },
  3: {
    id: 3,
    question_id: 3,
    chunks: [
      { id: 8, answer_id: 3, order: 1, text: 'My hometown has changed significantly over the past decade.', audio_url: MOCK_AUDIO },
      { id: 9, answer_id: 3, order: 2, text: 'When I was younger, the city had fewer skyscrapers and wider streets.', audio_url: MOCK_AUDIO },
      { id: 10, answer_id: 3, order: 3, text: 'Now it is much more modern, with new shopping malls and a metro system.', audio_url: MOCK_AUDIO },
      { id: 11, answer_id: 3, order: 4, text: 'While I appreciate the development, I sometimes miss the old charm.', audio_url: MOCK_AUDIO },
    ],
  },
  4: {
    id: 4,
    question_id: 4,
    chunks: [
      { id: 12, answer_id: 4, order: 1, text: 'I attended a public high school in my hometown.', audio_url: MOCK_AUDIO },
      { id: 13, answer_id: 4, order: 2, text: 'It was a large school with about two thousand students.', audio_url: MOCK_AUDIO },
      { id: 14, answer_id: 4, order: 3, text: 'The teachers were very dedicated and supportive.', audio_url: MOCK_AUDIO },
      { id: 15, answer_id: 4, order: 4, text: 'I particularly enjoyed the science laboratories and the library.', audio_url: MOCK_AUDIO },
    ],
  },
  5: {
    id: 5,
    question_id: 5,
    chunks: [
      { id: 16, answer_id: 5, order: 1, text: 'My favorite subject at school was English literature.', audio_url: MOCK_AUDIO },
      { id: 17, answer_id: 5, order: 2, text: 'I loved reading novels and discussing their themes with classmates.', audio_url: MOCK_AUDIO },
      { id: 18, answer_id: 5, order: 3, text: 'It helped me develop critical thinking and empathy.', audio_url: MOCK_AUDIO },
    ],
  },
  6: {
    id: 6,
    question_id: 6,
    chunks: [
      { id: 19, answer_id: 6, order: 1, text: 'Education has changed quite a lot since I was in school.', audio_url: MOCK_AUDIO },
      { id: 20, answer_id: 6, order: 2, text: 'Back then, we relied heavily on textbooks and chalkboards.', audio_url: MOCK_AUDIO },
      { id: 21, answer_id: 6, order: 3, text: 'Now students use tablets and interactive whiteboards in the classroom.', audio_url: MOCK_AUDIO },
      { id: 22, answer_id: 6, order: 4, text: 'I think technology has made learning more engaging and accessible.', audio_url: MOCK_AUDIO },
    ],
  },
  7: {
    id: 7,
    question_id: 7,
    chunks: [
      { id: 23, answer_id: 7, order: 1, text: 'I currently work as a software engineer at a tech company.', audio_url: MOCK_AUDIO },
      { id: 24, answer_id: 7, order: 2, text: 'My main responsibilities include developing web applications and collaborating with designers.', audio_url: MOCK_AUDIO },
      { id: 25, answer_id: 7, order: 3, text: 'I find the work challenging but very rewarding.', audio_url: MOCK_AUDIO },
      { id: 26, answer_id: 7, order: 4, text: 'The best part is solving complex problems and seeing the final product.', audio_url: MOCK_AUDIO },
    ],
  },
  8: {
    id: 8,
    question_id: 8,
    chunks: [
      { id: 27, answer_id: 8, order: 1, text: 'What I enjoy most about my job is the creative problem-solving.', audio_url: MOCK_AUDIO },
      { id: 28, answer_id: 8, order: 2, text: 'Every day brings new challenges that require innovative solutions.', audio_url: MOCK_AUDIO },
      { id: 29, answer_id: 8, order: 3, text: 'For instance, I recently helped redesign our core product to better serve users.', audio_url: MOCK_AUDIO },
      { id: 30, answer_id: 8, order: 4, text: 'That sense of impact and contribution keeps me motivated.', audio_url: MOCK_AUDIO },
    ],
  },
  9: {
    id: 9,
    question_id: 9,
    chunks: [
      { id: 31, answer_id: 9, order: 1, text: 'My career path has evolved quite significantly over the years.', audio_url: MOCK_AUDIO },
      { id: 32, answer_id: 9, order: 2, text: 'I started as a junior developer working on small features.', audio_url: MOCK_AUDIO },
      { id: 33, answer_id: 9, order: 3, text: 'Now I lead a team and mentor junior colleagues.', audio_url: MOCK_AUDIO },
      { id: 34, answer_id: 9, order: 4, text: 'Looking back, I never expected to enjoy the leadership aspect so much.', audio_url: MOCK_AUDIO },
    ],
  },
  10: {
    id: 10,
    question_id: 10,
    chunks: [
      { id: 35, answer_id: 10, order: 1, text: 'Technology has dramatically changed how people communicate.', audio_url: MOCK_AUDIO },
      { id: 36, answer_id: 10, order: 2, text: 'In the past, people relied on letters and landline phones.', audio_url: MOCK_AUDIO },
      { id: 37, answer_id: 10, order: 3, text: 'Now we have instant messaging and video calls at our fingertips.', audio_url: MOCK_AUDIO },
      { id: 38, answer_id: 10, order: 4, text: 'This has made long-distance relationships much easier to maintain.', audio_url: MOCK_AUDIO },
    ],
  },
  11: {
    id: 11,
    question_id: 11,
    chunks: [
      { id: 39, answer_id: 11, order: 1, text: 'My favorite piece of technology is my smartphone.', audio_url: MOCK_AUDIO },
      { id: 40, answer_id: 11, order: 2, text: 'It serves so many purposes from communication to navigation.', audio_url: MOCK_AUDIO },
      { id: 41, answer_id: 11, order: 3, text: 'For example, I use it to check emails, read news, and manage my schedule.', audio_url: MOCK_AUDIO },
      { id: 42, answer_id: 11, order: 4, text: 'I honestly cannot imagine my daily life without it.', audio_url: MOCK_AUDIO },
    ],
  },
  12: {
    id: 12,
    question_id: 12,
    chunks: [
      { id: 43, answer_id: 12, order: 1, text: 'I believe technology has made life both easier and more complicated.', audio_url: MOCK_AUDIO },
      { id: 44, answer_id: 12, order: 2, text: 'On one hand, everyday tasks like shopping and banking are much more convenient.', audio_url: MOCK_AUDIO },
      { id: 45, answer_id: 12, order: 3, text: 'On the other hand, we are constantly connected and it can be overwhelming.', audio_url: MOCK_AUDIO },
      { id: 46, answer_id: 12, order: 4, text: 'Striking a balance is the key to reaping the benefits without the stress.', audio_url: MOCK_AUDIO },
      { id: 47, answer_id: 12, order: 5, text: 'Overall, I think the advantages outweigh the drawbacks.', audio_url: MOCK_AUDIO },
    ],
  },
  13: {
    id: 13,
    question_id: 13,
    chunks: [
      { id: 48, answer_id: 13, order: 1, text: 'I usually make new friends through shared activities and interests.', audio_url: MOCK_AUDIO },
      { id: 49, answer_id: 13, order: 2, text: 'For instance, I joined a running club last year and met several like-minded people.', audio_url: MOCK_AUDIO },
      { id: 50, answer_id: 13, order: 3, text: 'I believe putting yourself in social situations is the key to making friends.', audio_url: MOCK_AUDIO },
    ],
  },
  14: {
    id: 14,
    question_id: 14,
    chunks: [
      { id: 51, answer_id: 14, order: 1, text: 'The quality I value most in a friend is trustworthiness.', audio_url: MOCK_AUDIO },
      { id: 52, answer_id: 14, order: 2, text: 'I believe a true friend should be reliable and keep their promises.', audio_url: MOCK_AUDIO },
      { id: 53, answer_id: 14, order: 3, text: 'For example, I really appreciate friends who show up when they say they will.', audio_url: MOCK_AUDIO },
      { id: 54, answer_id: 14, order: 4, text: 'Honesty and loyalty form the foundation of any strong friendship.', audio_url: MOCK_AUDIO },
    ],
  },
  15: {
    id: 15,
    question_id: 15,
    chunks: [
      { id: 55, answer_id: 15, order: 1, text: 'My idea of friendship has definitely changed as I have grown older.', audio_url: MOCK_AUDIO },
      { id: 56, answer_id: 15, order: 2, text: 'When I was younger, friendship was mostly about having fun together.', audio_url: MOCK_AUDIO },
      { id: 57, answer_id: 15, order: 3, text: 'Now I value deeper connections and meaningful conversations.', audio_url: MOCK_AUDIO },
      { id: 58, answer_id: 15, order: 4, text: 'I have fewer friends now, but the relationships are much stronger.', audio_url: MOCK_AUDIO },
    ],
  },
};

export function getTopicsByCategory(category?: string): Topic[] {
  if (!category || category === 'all') {
    return mockTopics;
  }
  return mockTopics.filter((topic) => topic.category === category);
}

export function getQuestionsByTopicCode(code: string): Question[] {
  return mockQuestions.filter((question) => question.topic_code === code);
}

export function getAnswerByQuestionId(id: number): Answer | undefined {
  return mockAnswers[id];
}

export function getTopicByCode(code: string): Topic | undefined {
  return mockTopics.find((topic) => topic.code === code);
}
