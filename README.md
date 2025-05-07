# CubixGyakorlasITaskListRefactor
## Működés
Az appba akármilyen felhasználó névvel be lehet jelentkezni,nincs ellenőrzés!  
A taskok egymás alatt jelennek meg az alapján, hogy kész vannak-e.  
Task felvitelére vagy a menüben a megfelelő pontot választva, vagy az alt+n kombinációt megnyomva lehet eljutni. Az id generálódik az összes task száma + 1 alapján.  
A taskot lehet törölni, ekkor egy confirm jelenik meg!  
A taskok kategorizálhatók, a listázás oldalon kiválasztható,hogy melyik kategória érdekel!A task felvitelekor meg kell adni a kategóriát is! A kategóriát törölni is lehet! Ha nem a Default, azt nem lehet törölni! A kategória nevének legalább 3-20 karakterből kell állnia és csak betűkből és spaceből állhat! A kategória neve módosítható és a taskok is frissülnek! Ha törlünk egy kategóriát a task kategória default lesz!      
Az adatokat localStorageben tárolja!  