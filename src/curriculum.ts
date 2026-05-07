import { type World } from './types';

export const CURRICULUM: World[] = [
  {
    id: 'budget_city',
    name: 'Budget City',
    subtitle: 'Master your money flow',
    icon: '💰',
    color: '#14B8A6',
    lessons: [
      {
        id: 'bc_01',
        title: 'What Is Money?',
        subtitle: 'The basics school never taught',
        xpReward: 100,
        coinReward: 25,
        content: "Money is basically a tool we all agreed to use instead of trading stuff. Without it, you'd have to trade your sneakers for pizza.",
        quiz: [
          {
            id: 'q1',
            question: "What is the main job of money?",
            options: ["To look cool", "To be a medium of exchange", "To keep in a safe", "To trade for gold"],
            correctIndex: 1,
            explanation: "Money lets us exchange value without bartering physical goods."
          }
        ]
      },
      {
        id: 'bc_02',
        title: 'Needs vs Wants',
        subtitle: 'The decision that changes everything',
        xpReward: 100,
        coinReward: 25,
        content: "Needs are things you can't survive without. Wants are everything else. The trick is knowing which is which.",
        quiz: [
          {
            id: 'q2',
            question: "Which of these is a NEED?",
            options: ["Netflix", "New Jordans", "Groceries", "PS5"],
            correctIndex: 2,
            explanation: "Food is a basic survival necessity."
          }
        ]
      }
    ]
  },
  {
    id: 'wall_street',
    name: 'Wall Street',
    subtitle: 'Build real wealth',
    icon: '📈',
    color: '#00FF88',
    lessons: [
      {
        id: 'ws_01',
        title: 'What Is a Stock?',
        subtitle: 'Own a piece of the world',
        xpReward: 120,
        coinReward: 30,
        content: "A stock is a tiny piece of a company. When you buy Apple stock, you literally own a tiny part of Apple.",
        quiz: []
      }
    ]
  }
];
