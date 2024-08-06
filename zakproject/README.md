# zakProject

1. Открыть через первую консоль mongodb/bin/ ввести mongod --directoryperdb --dbpath C:\
2. Открыть через вторую консоль  mongodb/bin/ ввести mongo
    * Теперь можно использовать команды mongo через эту консоль.
    
<<<<<<< HEAD

=======
    
>>>>>>> 683f9e78a3d95308b23f8b5643bd6f3e334f649a
Главная папка - zakProject/server/database
папки allFunction и MediatorDb - это старый набросок(на двнный момент не имеет смысла)

dataMain.js - connect DB

templateObjClient - для возвращения данных(for update Client)

zakProject/server/database/method :

все функции client работают только через объект User 
поиск всех клиентов осуществляеьбся через User.myClient - который хранит массив _idClient
и по id осуществляеться поиск самого объекта Client

добавление Client осуществляеться в контексте передаваемого User

И так впринципе со всеми функциями

method/client/clientUtils  - доп функции для поиска и нахождения нужных объектов


method/infoSend - будет связан только с User
при добавления его будут сразу браться все id от User!!!! 

в папке src/login.js - сдесь пример сессии!!! некоторые функциии наброски !!!
<<<<<<< HEAD


Добавилось поле в Клиенте - info;id


=======
>>>>>>> 683f9e78a3d95308b23f8b5643bd6f3e334f649a
