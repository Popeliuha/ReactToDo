 type Todos = {
    id: string;            // UUID
    position: number;      // Unique auto-incremented value
    title: string;         // Title of the to-do item
    category: string;      // Category of the to-do item (e.g., Work, Personal)
    date: Date;            // Date in DD/MM/YYYY format
    status: boolean;       // Status indicating if the task is completed
};

export type {Todos};