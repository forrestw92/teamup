#teamup

A NestJS project with graphql where you can create and join teams.

### Features

* Create and join teams
* Delete teams
* Leave Team
* Add and remove members
* User JWT Auth System

### Getting started

These steps will get you started with a development project.

#### Prerequisites

##### Mongodb

You will need a local mongodb server running or you can get a small db server at https://mlab.com/

#### Environment Variables
You will need to delete .example from .env.development.example and .env.production.example and fill out the fields with your own information.   

#### Installing

Run in project directory
> npm install

#### Deployment

Run in project directory
> npm run start:dev


#### GraphQL Schema
```graphql

type AccessToken {
  accessToken: String!
}

input CreateTeamInput {
  name: String!
}

input CreateUserInput {
  firstName: String!
  lastName: String!
  email: String!
  username: String!
  password: String!
  confirmPassword: String!
}

type DeleteTeam {
  teamId: String!
}

input JoinTeamInput {
  teamId: ID!
}

type Mutation {
  createTeam(createTeamInput: CreateTeamInput!): Team!
  joinTeam(joinTeamInput: JoinTeamInput!): Team!
  deleteTeam(teamId: String!): DeleteTeam!
  removeMember(memberId: String!): Team!
  leaveTeam: Team!
  createUser(createUserInput: CreateUserInput!): User!
}

type Query {
  team(teamId: String!): Team!
  teams: [Team!]!
  login(userLoginInput: UserLoginInput!): AccessToken!
}

type Team {
  id: String!
  name: String!
  owner: TeamMember!
  members: [TeamMember!]!
  createdAt: String!
  updatedAt: String!
}

type TeamMember {
  firstName: String!
  lastName: String!
  username: String!
}

type User {
  id: String!
  firstName: String!
  lastName: String!
  email: String!
  username: String!
  password: String!
  salt: String!
  createdAt: String!
  updatedAt: String!
}

input UserLoginInput {
  username: String!
  password: String!
}

```
#### Built with

[NestJS](https://nestjs.com/)

[MongoDB](https://www.mongodb.com/)

[NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)
