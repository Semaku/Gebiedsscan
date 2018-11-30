# Conclusies en aanbevelingen
De applicatie is ontwikkeld in het kader van een proeftuin waarmee een specifieke DSO toepassing - gebiedsontwikkeling – in de praktijk is getoetst. Wanneer de applicatie verder in de praktijk gebruikt zal worden door meerdere gebruikers is het raadzaam de volgende verbeteringen door te voeren. Hiermee zal de applicatie ook schaalbaar worden gemaakt voor de toekomst:

* Er wordt op dit moment geen gebruik gemaakt van een geautomatiseerd proces om verschillende data sources te laden zoals bijvoorbeeld voor de bomen dataset van de gemeente Utrecht. Nieuwe brondata kan worden toegevoegd indien deze is voorzien van  geometrische informatie waarmee de data op de kaart kan worden gekoppeld of wanneer de betreffende data over een adres component beschikt. T.b.v. automatisering van de verwerking van deze data in de applicatie is het aan te bevelen één van de volgende processen hiervoor in te richten:

    * De dataset kan middels een  API worden ontsloten vanuit de bron. Meerdere dataformaten kunnen worden verwerkt waaronder bijv. JSON
    
    * De data wordt geladen in het Kadaster Dataplatform als Linked Data waarmee de applicatie vervolgens dit platform kan bevragen middels het  SPARQL endpoint
    
    * Een regelmatige PostGIS data dump wordt beschikbaar gesteld aan het applicatieteam
    
    * Overige formaten zoals, GeoJSON en met enkele aanpassingen zelfs CSV kunnen worden aangeboden. 

* De data dumps kunnen geautomatiseerd worden, daarvoor kan een ETL worden vastgesteld zodat de gegevens geladen kunnen worden in PostGIS. Meer gedetailleerde uitleg: http://demo.semaku.com/gebiedsscan-docs/gebiedsscan-client/. Voor al deze varianten geldt dat het raadzaam is om eenmalig de data te laden en vervolgens duidelijke afspraken te maken omtrent update frequenties en processen.

    * De meeste offline/shapes/cvs data die  verzameld is had een specifieke script welke is opgeschoond en getransformeerd in een werkende GeoJSON. Alle scripts werken met een ander formaat vanuit de input kant. De import van deze data kan worden verbeterd door de implementatie van  een slimmere/efficiëntere data tabel  waarin primaire keys (geometrie/adres) automatisch worden geconverteerd naar de JSON. Hiermee wordt een import proces aanzienlijk vereenvoudigd.
    
    * Op dit moment worden de polygonen in de “frontend” applicatie middels WMS (Web Map Service) MAP tiles (kaartlagen) te renderen getoond. Door deze activiteit te verplaatsen naar de “backend” waar WMTS (Web Map Tile Service) worden geladen wordt dit proces qua performance sterk verbeterd en wordt de de map tile (kaartlaag) binnen een gebruiksvriendelijke responsetijd in de applicatie weergegeven.

    * Alle gebruikers hebben op dit moment gelijke rechten en er vindt geen onderscheid plaats tussen projecten, gebruikers en de makers van een initiatief. Functioneel zal nog goed nagedacht moeten worden over  wie wat mag creëren op de kaart aangezien de applicatie anders een grote “bende” kan worden. Dit vergt een verdere functionele analyse voordat deze functionaliteit op een waarde toevoegende manier kan functioneren. Momenteel kan iedereen een project aanmaken en zijn of haar eigen project aanpassen. Daarnaast is er een admin rol per gemeente beschikbaar die de projecten kan beheren en waar nodig aanpassen. Voor de applicatie in zijn totaliteit is een admin rol beschikbaar waarmee alle projecten kunnen worden aangepast. Er zal dan ook een duidelijk  beheer van rollen, gebruikersgroepen geïmplementeerd moeten worden om effectief datatoegang te beheren.

    * Een verdere verbetering van de UI en gebruikerservaring
