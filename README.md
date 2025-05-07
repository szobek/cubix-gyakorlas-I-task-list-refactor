# CubixGyakorlasITaskListRefactor

## Működés

Az appba akármilyen felhasználó névvel be lehet jelentkezni,nincs ellenőrzés!  
A taskok egymás alatt jelennek meg az alapján, hogy kész vannak-e.  
Task felvitelére vagy a menüben a megfelelő pontot választva, vagy az alt+n kombinációt megnyomva lehet eljutni. Az id generálódik az összes task száma + 1 alapján.  
A taskot lehet törölni, ekkor egy confirm jelenik meg!  
A taskok kategorizálhatók, a listázás oldalon kiválasztható,hogy melyik kategória érdekel!A task felvitelekor meg kell adni a kategóriát is! A kategóriát törölni is lehet! Ha nem a Default, azt nem lehet törölni! A kategória nevének legalább 3-20 karakterből kell állnia és csak betűkből és spaceből állhat! A kategória neve módosítható és a taskok is frissülnek! Ha törlünk egy kategóriát a task kategória default lesz!      
Az adatokat localStorageben tárolja!  

## Menüpontok

**Home**  
főoldal,még nincs tartalom  

**Task list**  
itt jelennek meg a taskok, felül a még nem készek, alul a készek. Itt a taskokon vannak különböző gombok:  
    - késznek lehet jelőlni  
    - lehet törölni  
    - meg lehet nézni 
    - lehet módosítani   
    Felül a kategória nevekre kattintva az adott kategória taskjai jelennek meg.
    Kiírja,hogy mennyi a kész/nem kész taskok száma.  

**New task**  
itt lehet új taskot létrehozni. Meg lehet adni a kategóriát,hogy fontos-e majd mentés.  

**Create category**  
itt lehet új kategóriát létre hozni. Csak a név kell!
**List categories**  
a kategóriákat listázza ki. lehet módosítani, törölni és a kategóriához tartozó taskokat lehet listázni.
Ha egy kategória törlésre kerül, a task 'Default' kategóriát kap.
Ha egy kategória módosul, akkor a task kategória is módosul.

**Logout**  
a felhasználót kilépteti és a localStorageből törli a felhasználó nevét
