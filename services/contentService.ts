const MOCK_CONTENT: { [key: string]: string } = {
  heater: `
### Betjening
- Tænd for varmepumpen med fjernbetjeningen som hænger på væggen.
- Indstil temperatur op og ned med fjernbetjeningen.
- **Meget vigtigt**: Varmepumpen skal stå på mode **"Heat"**. Alle andre programmer, også det program som hedder "Auto", er i forskellig grad køleprogrammer. Hvis andre programmer end Heat vælges, fungerer varmepumpen ikke optimalt.
- Man kan med fjernbetjeningen vælge at styre luftstrømmen i forskellige retninger hvis dette ønskes.

### Fjernstyring
Henrik kan tænde for varmepumpen via internettet inden ankomst, hvis varmepumpe og internet er tændt i huset.
  `,
  internet: `
### Wi-Fi Adgang
Koden er de 8 cifre i mormor/farmors telefonnummer.

### Router og Forbrug
Internetrouteren står på repos i loftsrummet. Der er begrænsning på 1000 GB data hver måned, så undgå at downloade store mængder data.
  `,
  monitoring: `
Der ligger en temperaturmåler i badeværelset og sidder en dørsensor i hoveddøren for at overvåge huset via internettet mod indbrud og frostskader.
  `,
  keys: `
Der er et sæt nøgler til skuret samt et sæt til terrassedøren, som hænger over kaffemaskinen. For at låse døren til skuret hives op i håndtaget mens nøglen drejes.
  `,
  consumption: `
- Medbring selv toiletpapir og køkkenruller.
- Hvis du bruger det sidste af øvrige forbrugsvarer, købes nyt, så det ikke mangler for den næste beboer. Forbrug af strøm afregnes årligt jf. den lille sorte bog.
- Hvis du efterlader mel, sukker m.m. pakkes det ind i plasticpose, så der ikke går dyr i det.
  `,
  tv: `
### Brug af TV'et

Vejledning kommer snart...
  `,
  oven: `
### Brug af Ovnen

Vejledning kommer snart...
  `,
  arrival: `
- Tænd for vandet i målerbrønden er ved postkassen i indkørslen.
- Tænd for strømmen på sikringsboksen.
- Skriv navn dato for ankomst og målerstand fra elmåler i den lille sorte bog, som ligger på sikringsboksen. Ved afrejse tilføjes det nye målertal fra elmåleren i bogen.
  `,
  departure: `
### Rengøring ved afrejse
- Alle værelser som har været brugt/beboet støvsuges og gulvet vaskes.
- I køkkenet rengøres køkkenvask, ovn og køleskab, borde tørres af og skuffer og hylder ryddes op så det fremstår pænt. Tag ikke brugte madvarer med hjem eller pak dem ind så der ikke går dyr i det.
- Rengør mikroovnen, hvis du har brugt den.
- Når der slukkes for strømmen, skal låget/lågen vær lidt åben på køleskab, opvaskemaskine, vaskemaskine og fryser, kaffemaskine og vandkoger.
- Vær opmærksom på om der ligger brød og krummer i brødbakker og skabe.
- Badeværelse: Toilet rengøres med børste og toiletrens. Spejlet pudses, håndvask m.m. afkalkes. Gulvet støvsuges og vaskes. Spjældet i væggen skal stå på klem når huset forlades om sommeren. Hvis der er varme på huset når det forlades skal spjældet lukkes.
- I stuen støvsuges både gulvet og stole/sofaer. Hvis brændeovnen er kold (ikke har været brugt i det senest døgn) tømmes den for aske. Bordene aftørres og ryd op, så alting fremstår pænt. Gulvet vaskes og der lægges brænde i kurven så det er klart til næste beboer.
- Udendørs: Ryd havemøbler og skur op så det fremstår ryddeligt og pænt, gerne pænere end ved ankomst. Om vinteren sættes havemøblerne på terrassen beskyttet for vind og vejr.

### Afslutning
- Skriv strømforbrug i den lille sorte bog, som ligger på sikringsboksen.
- Sluk for alle sikringsgrupper undtagen sikringsgruppe Lys 1 (på denne måde bevares strøm til WiFi og varmepumpe).
- Luk for vandet i målerbrønden ved postkassen.
- Tjek at dørene samt døren til skuret er låst.

### Afrejse om vinteren, ved frostsikring
- Sikringsgruppen med elvarme i sikringsboksen skal som den eneste være tændt.
- Sæt radiatoren i badeværelset på 5 grader. Efterlad døren fra badeværelset til gang åben.
- I stuen sættes radiatorer på minimum eller frostsikring.
- På værelserne skal varmen være slukket og dørene til værelserne skal være lukkede.
- Luk luftspjældet i brusenichen.
- Sæt varmepumpen på "sommerhusindstilling" 8 - 15 grader.
  `,
};

// This function simulates a network request to an AI service
export const fetchContent = (topic: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CONTENT[topic] || 'Indhold ikke fundet.');
    }, 500); // Simulate network delay
  });
};