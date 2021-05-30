class Personnage{
    degat=1;
    description='Oh un nouvel ennemi !';
    constructor(nom,niveau,pointDeVie,description)
    {
        this.nom=nom;
        this.niveau=niveau
        this.pointDeVie=pointDeVie

        this.description=description;

    }
    get nomDuPersonnage()
    {
        return this.nom;
    }
    get pointDeVieDuPersonnage()
    {
        return this.pointDeVie;
    }
    get degatDuPersonnage()
    {
        return this.degat;
    }
    get niveauDuPersonnage()
    {
        return this.niveau;
    }
    get descriptionDuPersonnage()
    {
        return this.description;
    }
    calculPointDeVie()
    {
        this.pointDeVie-=1;
    }
    calculDegat()
    {
        this.degat*=this.niveau;
    }

}