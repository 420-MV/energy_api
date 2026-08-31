import { randomUUID } from "crypto";

export class Building {
    id: string;
    code: string; 
    name: string;
    address?: string;
    yearBuilt: number;
    createdAt: Date;
    updatedAt: Date;

    
    constructor(name: string, code: string, yearBuilt: number, address?: string) {
        // Génère automatiquement un identifiant unique (UUID v4) lors du 'new Building()'
        this.id = randomUUID();
        this.name = name;
        this.code = code;
        address??this.address;
        this.yearBuilt = yearBuilt;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    /**
   * Exemple de méthode métier : Calcule l'âge du bâtiment
   * Retourne null si l'année de construction n'est pas renseignée
   */
    getAge(): number | null {
        if (!this.yearBuilt) return null;
        const currentYear = new Date().getFullYear();
        return currentYear - this.yearBuilt, 10;
    }
}
