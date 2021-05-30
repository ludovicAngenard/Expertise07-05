class Bonus
{
    multiplicateurEffet = 1;
    constructor(prix, nombre)
    {
        this.prix = prix;
        this.nombre = nombre;
    }

    get prixBonus()
    {
        return this.prix;
    }
    get nombreBonus()
    {
        return this.nombre;
    }
    get effetBonus()
    {
        return this.multiplicateurEffet;
    }
    calculPrixBonus()
    {
        this.prix*=2;
        return this.prix;
    }
    calculNombreEnMoins(){
        this.nombre-=1;
        return this.nombre;
    }
    calculNombreBonus()
    {
        this.nombre+=1;
        return this.nombre;
    }
    calculEffetBonus()
    {
        this.multiplicateurEffet*=2;
        return  this.multiplicateurEffet;
    }

}
