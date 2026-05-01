export interface GFG160Problem {
  day: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
}

export interface GFG160Topic {
  name: string;
  icon: string;
  problems: GFG160Problem[];
}

// GFG 160 - Complete 160 Days of Problem Solving
// Pre-marked based on Dhruv's progress (can be toggled via localStorage)
export const gfg160DSTopics: GFG160Topic[] = [
  {
    name: "Arrays",
    icon: "📊",
    problems: [
      { day: 1, name: "Second Largest", difficulty: "Easy", completed: false },
      { day: 2, name: "Move All Zeroes to End", difficulty: "Easy", completed: false },
      { day: 3, name: "Reverse an Array", difficulty: "Easy", completed: false },
      { day: 4, name: "Rotate Array", difficulty: "Medium", completed: false },
      { day: 5, name: "Next Permutation", difficulty: "Medium", completed: false },
      { day: 6, name: "Majority Element II", difficulty: "Medium", completed: false },
      { day: 7, name: "Stock Buy and Sell – Multiple Transaction Allowed", difficulty: "Hard", completed: false },
      { day: 8, name: "Stock Buy and Sell – Max one Transaction Allowed", difficulty: "Easy", completed: false },
      { day: 9, name: "Minimize the Heights II", difficulty: "Medium", completed: false },
      { day: 10, name: "Kadane's Algorithm", difficulty: "Medium", completed: false },
      { day: 11, name: "Maximum Product Subarray", difficulty: "Medium", completed: false },
      { day: 12, name: "Max Circular Subarray Sum", difficulty: "Hard", completed: false },
      { day: 13, name: "Smallest Positive Missing Number", difficulty: "Medium", completed: false },
    ],
  },
  {
    name: "Strings",
    icon: "🔤",
    problems: [
      { day: 14, name: "Implement Atoi", difficulty: "Medium", completed: false },
      { day: 15, name: "Add Binary Strings", difficulty: "Medium", completed: false },
      { day: 16, name: "Anagram", difficulty: "Easy", completed: false },
      { day: 17, name: "Non Repeating Character", difficulty: "Easy", completed: false },
      { day: 18, name: "Search Pattern (KMP Algorithm)", difficulty: "Hard", completed: false },
      { day: 19, name: "Min Chars to Add for Palindrome", difficulty: "Hard", completed: false },
      { day: 20, name: "Strings Rotations of Each Other", difficulty: "Easy", completed: false },
    ],
  },
  {
    name: "Sorting",
    icon: "🔀",
    problems: [
      { day: 21, name: "Sort 0s, 1s and 2s", difficulty: "Easy", completed: false },
      { day: 22, name: "Find H-Index", difficulty: "Medium", completed: false },
      { day: 23, name: "Count Inversions", difficulty: "Medium", completed: false },
      { day: 24, name: "Overlapping Intervals", difficulty: "Medium", completed: false },
      { day: 25, name: "Insert Interval", difficulty: "Medium", completed: false },
      { day: 26, name: "Non-overlapping Intervals", difficulty: "Medium", completed: false },
      { day: 27, name: "Merge Without Extra Space", difficulty: "Hard", completed: false },
    ],
  },
  {
    name: "Searching",
    icon: "🔍",
    problems: [
      { day: 28, name: "Number of Occurrence", difficulty: "Easy", completed: false },
      { day: 29, name: "Sorted and Rotated Minimum", difficulty: "Easy", completed: false },
      { day: 30, name: "Search in Rotated Sorted Array", difficulty: "Medium", completed: false },
      { day: 31, name: "Peak Element", difficulty: "Easy", completed: false },
      { day: 32, name: "K-th Missing Positive Number in a Sorted Array", difficulty: "Medium", completed: false },
      { day: 33, name: "Aggressive Cows", difficulty: "Medium", completed: false },
      { day: 34, name: "Allocate Minimum Pages", difficulty: "Medium", completed: false },
      { day: 35, name: "Kth element of two Arrays", difficulty: "Medium", completed: false },
    ],
  },
  {
    name: "Matrix",
    icon: "🔢",
    problems: [
      { day: 36, name: "Spirally traversing a matrix", difficulty: "Medium", completed: false },
      { day: 37, name: "Rotate by 90 degree", difficulty: "Medium", completed: false },
      { day: 38, name: "Search in a Row-Column sorted Matrix", difficulty: "Easy", completed: false },
      { day: 39, name: "Search in a row-wise sorted matrix", difficulty: "Easy", completed: false },
      { day: 40, name: "Set Matrix Zeroes", difficulty: "Medium", completed: false },
    ],
  },
  {
    name: "Hashing",
    icon: "#️⃣",
    problems: [
      { day: 41, name: "Two Sum - Pair with Given Sum", difficulty: "Easy", completed: false },
      { day: 42, name: "Count pairs with given sum", difficulty: "Easy", completed: false },
      { day: 43, name: "Find All Triplets with Zero Sum", difficulty: "Medium", completed: false },
      { day: 44, name: "Intersection of Two arrays with Duplicate Elements", difficulty: "Easy", completed: false },
      { day: 45, name: "Union of Arrays with Duplicates", difficulty: "Easy", completed: false },
      { day: 46, name: "Longest Consecutive Subsequence", difficulty: "Medium", completed: false },
      { day: 47, name: "Print Anagrams Together", difficulty: "Medium", completed: false },
      { day: 48, name: "Subarrays with sum K", difficulty: "Medium", completed: false },
      { day: 49, name: "Count Subarrays with given XOR", difficulty: "Medium", completed: false },
    ],
  },
  {
    name: "Two Pointer Technique",
    icon: "👆",
    problems: [
      { day: 50, name: "Count all triplets with given sum in sorted array", difficulty: "Medium", completed: false },
      { day: 51, name: "Count Pairs whose sum is less than target", difficulty: "Easy", completed: false },
      { day: 52, name: "Sum Pair closest to target", difficulty: "Easy", completed: false },
      { day: 53, name: "Pair with given sum in a sorted array", difficulty: "Easy", completed: false },
      { day: 54, name: "Count the number of possible triangles", difficulty: "Medium", completed: false },
      { day: 55, name: "Container With Most Water", difficulty: "Medium", completed: false },
      { day: 56, name: "Trapping Rain Water", difficulty: "Hard", completed: false },
    ],
  },
  {
    name: "Prefix Sum",
    icon: "➕",
    problems: [
      { day: 57, name: "Equilibrium Point", difficulty: "Easy", completed: false },
      { day: 58, name: "Longest Subarray with Sum K", difficulty: "Medium", completed: false },
      { day: 59, name: "Largest subarray of 0's and 1's", difficulty: "Medium", completed: false },
      { day: 60, name: "Product array puzzle", difficulty: "Easy", completed: false },
    ],
  },
  {
    name: "Linked List",
    icon: "🔗",
    problems: [
      { day: 61, name: "Reverse a linked list", difficulty: "Easy", completed: false },
      { day: 62, name: "Rotate a Linked List", difficulty: "Medium", completed: false },
      { day: 63, name: "Merge two sorted linked lists", difficulty: "Easy", completed: false },
      { day: 64, name: "Linked List Group Reverse", difficulty: "Hard", completed: false },
      { day: 65, name: "Add Number Linked Lists", difficulty: "Medium", completed: false },
      { day: 66, name: "Clone a linked list with next and random pointer", difficulty: "Hard", completed: false },
      { day: 67, name: "Detect Loop in linked list", difficulty: "Easy", completed: false },
      { day: 68, name: "Find the first node of loop in linked list", difficulty: "Easy", completed: false },
      { day: 69, name: "Remove loop in Linked List", difficulty: "Medium", completed: false },
      { day: 70, name: "LRU Cache", difficulty: "Hard", completed: false },
    ],
  },
  {
    name: "Stack",
    icon: "📚",
    problems: [
      { day: 71, name: "Parenthesis Checker", difficulty: "Easy", completed: false },
      { day: 72, name: "Longest valid Parentheses", difficulty: "Hard", completed: false },
      { day: 73, name: "Next Greater Element", difficulty: "Medium", completed: false },
      { day: 74, name: "Stock span problem", difficulty: "Medium", completed: false },
      { day: 75, name: "Histogram Max Rectangular Area", difficulty: "Hard", completed: false },
      { day: 76, name: "Maximum of minimum for every window size", difficulty: "Hard", completed: false },
      { day: 77, name: "Get Min from Stack", difficulty: "Medium", completed: false },
    ],
  },
  {
    name: "Queue & Deque",
    icon: "📝",
    problems: [
      { day: 78, name: "K Sized Subarray Maximum", difficulty: "Medium", completed: false },
      { day: 79, name: "Longest Bounded-Difference Subarray", difficulty: "Medium", completed: false },
    ],
  },
  {
    name: "Tree",
    icon: "🌳",
    problems: [
      { day: 80, name: "Level order traversal", difficulty: "Easy", completed: false },
      { day: 81, name: "Height of Binary Tree", difficulty: "Easy", completed: false },
      { day: 82, name: "Diameter of a Binary Tree", difficulty: "Medium", completed: false },
      { day: 83, name: "Mirror Tree", difficulty: "Easy", completed: false },
      { day: 84, name: "Construct Tree from Inorder & Preorder", difficulty: "Medium", completed: false },
      { day: 85, name: "Inorder Traversal", difficulty: "Easy", completed: false },
      { day: 86, name: "Tree Boundary Traversal", difficulty: "Medium", completed: false },
      { day: 87, name: "Maximum path sum from any node", difficulty: "Hard", completed: false },
      { day: 88, name: "K Sum Paths", difficulty: "Medium", completed: false },
      { day: 89, name: "Check for BST", difficulty: "Easy", completed: false },
      { day: 90, name: "k-th Smallest in BST", difficulty: "Easy", completed: false },
      { day: 91, name: "Pair Sum in BST", difficulty: "Medium", completed: false },
      { day: 92, name: "Fixing Two nodes of a BST", difficulty: "Hard", completed: false },
      { day: 93, name: "Lowest Common Ancestor in a BST", difficulty: "Easy", completed: false },
      { day: 94, name: "Serialize and deserialize a binary tree", difficulty: "Medium", completed: false },
    ],
  },
  {
    name: "Heap",
    icon: "⛰️",
    problems: [
      { day: 95, name: "K Largest Elements", difficulty: "Medium", completed: false },
      { day: 96, name: "K Closest Points to Origin", difficulty: "Medium", completed: false },
      { day: 97, name: "Merge K sorted linked lists", difficulty: "Medium", completed: false },
      { day: 98, name: "Find median in a stream", difficulty: "Hard", completed: false },
    ],
  },
  {
    name: "Graph",
    icon: "🕸️",
    problems: [
      { day: 99, name: "Undirected Graph Cycle", difficulty: "Medium", completed: false },
      { day: 100, name: "Directed Graph Cycle", difficulty: "Medium", completed: false },
      { day: 101, name: "Topological sort", difficulty: "Medium", completed: false },
      { day: 102, name: "Find the number of islands", difficulty: "Medium", completed: false },
      { day: 103, name: "Rotten Oranges", difficulty: "Medium", completed: false },
      { day: 104, name: "Flood Fill", difficulty: "Medium", completed: false },
      { day: 105, name: "Bridge edge in a graph", difficulty: "Medium", completed: false },
      { day: 106, name: "Articulation Point", difficulty: "Hard", completed: false },
      { day: 107, name: "Shortest path in Undirected Graph", difficulty: "Medium", completed: false },
      { day: 108, name: "Dijkstra Algorithm", difficulty: "Medium", completed: false },
      { day: 109, name: "Bellman-Ford", difficulty: "Medium", completed: false },
      { day: 110, name: "Floyd Warshall", difficulty: "Medium", completed: false },
      { day: 111, name: "Minimum Spanning Tree", difficulty: "Medium", completed: false },
      { day: 112, name: "Alien Dictionary", difficulty: "Hard", completed: false },
    ],
  },
  {
    name: "Dynamic Programming",
    icon: "🧩",
    problems: [
      { day: 113, name: "Climbing Stairs", difficulty: "Easy", completed: false },
      { day: 114, name: "Min Cost Climbing Stairs", difficulty: "Medium", completed: false },
      { day: 115, name: "Coin Change (Count Ways)", difficulty: "Medium", completed: false },
      { day: 116, name: "Coin Change (Minimum Coins)", difficulty: "Medium", completed: false },
      { day: 117, name: "0/1 Knapsack Problem", difficulty: "Medium", completed: false },
      { day: 118, name: "Unbounded Knapsack", difficulty: "Medium", completed: false },
      { day: 119, name: "Edit Distance", difficulty: "Hard", completed: false },
      { day: 120, name: "Longest Common Subsequence", difficulty: "Medium", completed: false },
      { day: 121, name: "Longest Common Substring", difficulty: "Medium", completed: false },
      { day: 122, name: "Longest Increasing Subsequence", difficulty: "Medium", completed: false },
      { day: 123, name: "Longest Palindromic Subsequence", difficulty: "Medium", completed: false },
      { day: 124, name: "Matrix Chain Multiplication", difficulty: "Hard", completed: false },
      { day: 125, name: "Egg Dropping Puzzle", difficulty: "Hard", completed: false },
      { day: 126, name: "Word Break", difficulty: "Medium", completed: false },
      { day: 127, name: "Partition Equal Subset Sum", difficulty: "Medium", completed: false },
      { day: 128, name: "Rod Cutting", difficulty: "Medium", completed: false },
      { day: 129, name: "Minimum Jumps", difficulty: "Medium", completed: false },
      { day: 130, name: "Maximum Sum Increasing Subsequence", difficulty: "Medium", completed: false },
      { day: 131, name: "Subset Sum Problem", difficulty: "Medium", completed: false },
      { day: 132, name: "Count Partitions with Given Difference", difficulty: "Medium", completed: false },
      { day: 133, name: "Ways to Reach the Nth Stair", difficulty: "Easy", completed: false },
      { day: 134, name: "Min Deletions and Insertions to Transform", difficulty: "Medium", completed: false },
      { day: 135, name: "Palindrome Partitioning", difficulty: "Hard", completed: false },
      { day: 136, name: "Boolean Parenthesization", difficulty: "Hard", completed: false },
      { day: 137, name: "Wildcard Pattern Matching", difficulty: "Hard", completed: false },
      { day: 138, name: "Optimal Strategy for a Game", difficulty: "Medium", completed: false },
      { day: 139, name: "Count Square Submatrices with All 1s", difficulty: "Medium", completed: false },
      { day: 140, name: "Total Decoding Messages", difficulty: "Medium", completed: false },
      { day: 141, name: "Stickler Thief", difficulty: "Medium", completed: false },
      { day: 142, name: "Longest String Chain", difficulty: "Medium", completed: false },
      { day: 143, name: "Longest Bitonic Subsequence", difficulty: "Medium", completed: false },
      { day: 144, name: "Count number of hops", difficulty: "Easy", completed: false },
    ],
  },
  {
    name: "Greedy",
    icon: "💰",
    problems: [
      { day: 145, name: "Activity Selection", difficulty: "Medium", completed: false },
      { day: 146, name: "N meetings in one room", difficulty: "Easy", completed: false },
      { day: 147, name: "Job Sequencing Problem", difficulty: "Medium", completed: false },
      { day: 148, name: "Fractional Knapsack", difficulty: "Medium", completed: false },
      { day: 149, name: "Minimum Platforms", difficulty: "Medium", completed: false },
      { day: 150, name: "Huffman Encoding", difficulty: "Hard", completed: false },
      { day: 151, name: "Maximize Partitions with Unique Characters", difficulty: "Medium", completed: false },
      { day: 152, name: "Gas Station", difficulty: "Medium", completed: false },
      { day: 153, name: "Minimum Cost of ropes", difficulty: "Easy", completed: false },
    ],
  },
  {
    name: "Recursion & Backtracking",
    icon: "🔄",
    problems: [
      { day: 154, name: "Permutations of a String", difficulty: "Medium", completed: false },
      { day: 155, name: "N-Queen Problem", difficulty: "Hard", completed: false },
      { day: 156, name: "Solve the Sudoku", difficulty: "Hard", completed: false },
      { day: 157, name: "Word Search", difficulty: "Medium", completed: false },
      { day: 158, name: "Rat in a Maze", difficulty: "Medium", completed: false },
      { day: 159, name: "M-Coloring Problem", difficulty: "Medium", completed: false },
      { day: 160, name: "Subset Sum", difficulty: "Medium", completed: false },
    ],
  },
];

export const getTotalProblems = () => {
  return gfg160DSTopics.reduce((sum, topic) => sum + topic.problems.length, 0);
};

export const getCompletedProblems = (completedMap: Record<number, boolean>) => {
  return gfg160DSTopics.reduce((sum, topic) => {
    return sum + topic.problems.filter((p) => completedMap[p.day] ?? p.completed).length;
  }, 0);
};
