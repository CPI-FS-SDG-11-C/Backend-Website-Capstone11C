# Backend-Website-Capstone11C

Repository for Backend Capstone GG3 Team SDG-11-C

## Running Locally

To clone and run a this API on your machine, make sure you have [NodeJs](https://nodejs.org/en) v18, [Git](https://git-scm.com/downloads), and [MongoDB](https://www.mongodb.com/try/download/community) v6 installed and running, then follow these steps:

1. Open your terminal, clone the repository by running `git clone` command:

```sh
git clone https://github.com/CPI-FS-SDG-11-C/Backend-Website-Capstone11C.git
```

2. Go to the project directory:

```sh
cd Backend-Website-Capstone11C
```

3. Install all dependencies using `npm install` command:

```sh
npm install
```

4. Add a `.env` file before running the project, create a new file called `.env` in the root directory of the project. Then, add any environment variables need, using the `KEY=VALUE` format.

```
PORT=3001 // port you want to use
MONGODB_URI=mongodb://localhost:27017/{name of your mongodb database}
SECRET_KEY='{add your secret key here, it can be anything}'

```

5. Run the API using `npm run dev` command for development mode:

```sh
npm run dev
```

or `npm run start` command for production mode:

```sh
npm run start
```

6. The API is running on port `3001` by default. You can change the port by editing the `PORT` variable in `.env` file.

That's it! You should now have the API running locally on your machine.

## Docker Image

1. To run this project using Docker, make sure the docker engine is running, then open your terminal and run this command:

```sh
docker pull adanngrha/capstone-sgd-11c:backend-capstone-11c
```

2. Run the container using the docker image:

```sh
docker run -p 3001:3001 backend-capstone-11c
```

3. Go to this url to check if the API is running, it should return list of subdistricts

```sh
http://localhost:3001/api/subdistricts
```

## Database Schema

### User

| Field        | Type   | Description         |
| ------------ | ------ | ------------------- |
| username     | String | User's username     |
| email        | String | User's email        |
| password     | String | User's password     |
| phone_number | String | User's phone number |

### Subdistrict

| Field         | Type   | Description           |
| ------------- | ------ | --------------------- |
| nama_kec      | String | Subdistrict's name    |
| kode_kec      | String | Subdistrict's code    |
| luas_kec      | Integer| Subdistrict's area    |

### RTH

| Field         | Type   | Description                  |
| ------------- | ------ | ---------------------------- |
| jenis         | String | GreenSpace/RTH's type        |
| kelurahan     | String | GreenSpace/RTH's ward        |
| nama          | String | GreenSpace/RTH's name        |
| lokasi        | String | GreenSpace/RTH's location    |
| luas          | Integer| GreenSpace/RTH's area        |
| gambar        | String | GreenSpace/RTH's picture url |
| deskripsi     | String | GreenSpace/RTH's description |
| kec_id        |ObjectId| Subdistrict's id             |

### Review

| Field       | Type     | Description                          |
| ----------- | -------- | ------------------------------------ |
| user        | Object   | User's data who's created the review |
| id_rth      | ObjectId | RTH's id                             |
| rating      | Number   | Review's rating (limited to 1-5)     |
| comment     | String   | Review's comment                     |
| created_at  | Date     | Review's created date                |

### Article

| Field     | Type     | Description            |
| --------- | -------- | ---------------------- |
| judul     | String   | Article's title        |
| teks      | String   | Article's content      |
| gambar    | String   | Article's picture url  |
| pengarang | String   | Article's author       |

### Attraction

| Field     | Type     | Description            |
| --------- | -------- | ---------------------- |
| name      | String   | Attraction's name      |
| alamat    | String   | Attraction's address   |
| taman     | ObjectId | RTH's id               |

# API Documentation

The API is structured according to the RESTful architecture principles, designed to be intuitive and easy to use, with clear and concise endpoints.
Check the documented API [here](https://documenter.getpostman.com/view/17326401/2s9Ye8faBH).
