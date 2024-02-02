# Vendisc api doc

## 1、file api

### 1.1、upload file

- method: **POST**

- url: `/api/file/upload`

- head: 

  | property name | type   | required | description                            |
  | ------------- | ------ | -------- | -------------------------------------- |
  | authorization | string | true     | user identity token                    |
  | lid           | int    | false    | the id of the file location identifier |

  *tips: Empty lid means upload file in root directory*

- body:

  | property name | type | required | description  |
  | ------------- | ---- | -------- | ------------ |
  | file          | file | true     | file content |

- response: 

  ```JSON
  {
  	"code": 1,
  	"msg": "upload success"
  }
  ```

  

### 1.2、remove file

- method: **GET**

- url: `/api/file/remove/:fid`

- head:

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- params:

  | property name | type | required | description    |
  | ------------- | ---- | -------- | -------------- |
  | fid           | int  | true     | file unique id |

- response: 

  ```JSON
  {
  	"code": 1,
  	"msg": "remove success"
  }
  ```



### 1.3、rename file

- method: **POST**

- url: `/api/file/rename`

- head:

   | property name | type   | required | description         |
   | ------------- | ------ | -------- | ------------------- |
   | authorization | string | true     | user identity token |

- body:

   | property name | type   | required | description    |
   | ------------- | ------ | -------- | -------------- |
   | fid           | int    | true     | file unique id |
   | fname         | string | true     | new file name  |

- response: 

   ```JSON
   {
   	"code": 1,
   	"msg": "rename success"
   }
   ```



### 1.4、get file list

- method: **GET**

- url: `/api/file/list`

- head: 

  | property name | type   | required | description                            |
  | ------------- | ------ | -------- | -------------------------------------- |
  | authorization | string | true     | user identity token                    |
  | lid           | int    | false    | the id of the file location identifier |

- response:

  ```JSON
  {
  	"code": 1,
  	"msg": "get files success",
  	"data": [
  		{
  			"fid": 1,
  			"fname": "xxx.jpeg",
  			"date": "2022-10-01 08:00",
  			"type": "img",
  			"size": 1024,
  			"url": "/files/xxxx-xxxx-xxxx.jpeg"
  		}
  	]
  }
  ```
  



### 1.5、get list

- method: **GET**

- url: `/api/list`

- head: 

  | property name | type   | required | description                            |
  | ------------- | ------ | -------- | -------------------------------------- |
  | authorization | string | true     | user identity token                    |
  | lid           | int    | false    | the id of the file location identifier |

- response:

  ```JSON
  {
  	"code": 1,
  	"msg": "get list success",
  	"data": [
  		{
  			"id": "f1",
  			"fname": "xxx.jpeg",
  			"date": "2022-10-01 08:00",
  			"type": "image",
  			"size": 1024,
  			"url": "/files/xxxx-xxxx-xxxx.jpe"
  		}
  	]
  }
  ```



### 1.6、get used capacity

- method: **GET**

- url: `/api/file/used`

- head: 

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- response:

  ```JSON
  {
  	"code": 1,
  	"msg": "get used capacity success",
  	"data": {
          "usedCapacity": 1024
      }
  }
  ```




### 1.7、move file

- method: **POST**

- url: `/api/file/move`

- head: 

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- body:

  | property name | type | required | description      |
  | ------------- | ---- | -------- | ---------------- |
  | fid           | int  | true     | file unique id   |
  | fdid          | int  | true     | folder unique id |

- response:

  ```JSON
  {
  	"code": 1,
  	"msg": "move success"
  }
  ```



### 1.8、download file

- method: **GET**

- url: `/api/file/download/:fid`

- head: 

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- params:

  | property name | type | required | description    |
  | ------------- | ---- | -------- | -------------- |
  | fid           | int  | true     | file unique id |

- response: 

  ```JSON
  {
  	"code": 1,
  	"msg": "download create",
  	"data": [/* file steam */]
  }
  ```

  

## 2、folder api

### 2.1、create folder

- method: **POST**

- url: `/api/folder/create`

- head:

  | property name | type   | required | description                            |
  | ------------- | ------ | -------- | -------------------------------------- |
  | authorization | string | true     | user identity token                    |
  | lid           | int    | false    | the id of the file location identifier |

  *tips: Empty lid means create folder in root directory*

- body: 

  | property name | type   | required | description                    |
  | ------------- | ------ | -------- | ------------------------------ |
  | fdname        | string | true     | the name of the created folder |

- response: 

  ```JSON
  {
  	"code": 1,
  	"msg": "create success"
  }
  ```

  

### 2.2、remove folder

- method: **GET**

- url: `/api/folder/remvoe/:fdid`

- head:

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- params:

  | property name | type | required | description              |
  | ------------- | ---- | -------- | ------------------------ |
  | fdid          | int  | true     | id of the deleted folder |

- response:

  ```JSON
  {
  	"code": 1,
  	"msg": "remove success"
  }
  ```

  

### 2.3、rename folder

- method: **POST**

- url: `/api/folder/rename`

- head: 

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- body:

  | property name | type   | required | description             |
  | ------------- | ------ | -------- | ----------------------- |
  | fdid          | int    | true     | id of the reanme folder |
  | fdname        | string | true     | new folder name         |

- response: 

  ```JSON
  {
  	"code": 1,
  	"msg": "rename success"
  }
  ```

  

### 2.4、get folder list

- method: **GET**

- url: `/api/folder/list`

- head: 

  | property name | type   | required | description                            |
  | ------------- | ------ | -------- | -------------------------------------- |
  | authorization | string | true     | user identity token                    |
  | lid           | int    | false    | the id of the file location identifier |

- response:

  ```JSON
  {
  	"code": 1,
  	"msg": "get folders success",
  	"data": [
  		{
              "fdid": 1,
              "fdname": "new folder",
              "date": "2022-10-01 08:00"
  		}
  	]
  }
  ```
  
  

## 3、user api

### 3.1、user register

- method: **POST**

- url: `/api/user/register`

- body: 

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | username      | string | true     | user login account  |
  | password      | string | true     | user login password |
  | password2     | string | true     | confirm password    |
  | uname         | string | true     | user nick name      |
  | email         | string | true     | user email          |

- response: 

  ```JSON
  {
  	"code": 1,
  	"msg": "resiger success"
  }
  ```



### 3.2、user login

- method: **POST**

- url: `/api/user/login`

- body: 

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | username      | string | true     | user login account  |
  | password      | string | true     | user login password |
  
- response: 

  ```JSON
  {
  	"code": 1,
  	"msg": "login success",
      "data": {
          "token": "/* token string */"
      }
  }
  ```



### 3.3、rename user

- method: **GET**

- url: `/api/user/rename/:name`

- head: 

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- params:

  | property name | type   | required | description        |
  | ------------- | ------ | -------- | ------------------ |
  | name          | string | true     | new user nick name |

- response:

  ```JSON
  {
  	"code": 1,
  	"msg": "rename success"
  }
  ```



### 3.4、edit password

- method: **POST**

- url: `/api/user/password`

- head:

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- body:

  | property name | type   | required | description  |
  | ------------- | ------ | -------- | ------------ |
  | oldPwd        | string | true     | old password |
  | newPwd        | string | true     | new password |

- response:

  ```JSON
  {
      "code": 1,
      "msg": "edit password success"
  }
  ```



### 3.5、edit email

- method: **GET**

- url: `/api/user/email/:email`

- head:

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- params:

  | property name | type   | required | description |
  | ------------- | ------ | -------- | ----------- |
  | email         | string | true     | new email   |

- response:

  ```JSON
  {
      "code": 1,
      "msg": "edit email success"
  }
  ```



### 3.6、retrieve password

- method: **GET**

- url: `/api/user/retrieve/:email`

- params: 

  | property name | type   | required | description |
  | ------------- | ------ | -------- | ----------- |
  | email         | string | true     | user email  |

- response:

  ```JSON
  {
  	"code": 1,
  	"msg": "Your password has been reset, and the temporary password has been sent to your email. Please check it in time and modify it immediately after logging in."
  }
  ```



### 3.7、user logout

- method: **GET**

- url: `/api/user/logout`

- head: 
  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |
- response:

  ```JSON
  {
  	"code": 1,
  	"msg": "logout success"
  }
  ```



### 3.8、get user info

- method: **GET**

- url: `/api/user/info`

- head: 

  | property name | type   | required | description         |
  | ------------- | ------ | -------- | ------------------- |
  | authorization | string | true     | user identity token |

- response:

  ```JSON
  {
      "code": 1,
      "msg": "get user info success",
      "data": {
          "uid": 1,
          "uname": "bulv",
          "username": "bulv0620",
          "timestamp": "2022-10-18 18:54:00",
          "capacity": 104857600,
          "email": "bulv0620@163.com",
          "root_id": 1
      }
  }
  ```



## 4、Error Code

```JSON
{
    "FULL_CAPACITY": -10,
    "FILE_EXIST": -11,
    "FILE_NOT_EXIST": -12,

    "INVALID_INPUT": -20,

    "USERNAME_EXIST": -21,
    "EMAIL_EXIST": -22,
    "EMAIL_NOT_EXIST": -23,
    "INCORRECT_USERNAME_OR_PASSWORD": -24,
    "PERMISSION_DENIED": -25,
    "WRONG_OLD_PASSWORD": -26,

    "FOLDER_EXIST": -30,
    "FOLDER_NOT_EXIST": -31,
    "FOLDER_IS_NOT_EMPTY": -32,
    
    "UNEXPECTED_ERROR": -99
}
```