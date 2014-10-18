# PicJam Game

## WS API

- `>` client to server
- `<` server to client

#### User

#### < user.create

Emitted when a new user is connected.

```js
{
  id: '...'
}
```

#### < user.destroy

Emitted when a user is disconnected.

```js
{
  id: '...'
}
```

#### < user.update

Emitted when a user is updated.

```js
{
  id: '...',
  username: '...'
}
```

#### > me.update

Update our own data.

```js
{
  username: ''
}
```

### Chat

#### > chat

Send a new chat message.

```js
{
  text: '...'
}
```

#### < chat

Emitted when a new message is received.

```js
{
  userId: '...',
  text: '...'
}
```

### Game

#### < game.status

Emitted to give the status of the game.

```js
{
  users: [
    {
      id: '...',
      username: '...'
    }
  ]
}
```

#### < game.start

Emitted when the game start.

```js
{
  time: 10
}
```

#### < game.end

Emitted when the game end.

```js
{
  ranks: [
    {
      userId: 'xxx',
      score: 'xxx',
      rank: 1
    }
  ]
}
```

### Questions

#### < question.start

Emitted when a new question is sent.

```js
{
  id: '...',
  time: 30
}
```

#### < question.update

Emitted when a question must be updated.

```js
{
  id: '...',
  svg: {}
}
```

#### > question.answer

Send an answer to the question.

```js
{
  id: '...',
  questionId: '...',
  text: '...'
}
```

#### < question.answer.ack

Emitted to acknowledge the answer to a question.

```js
{
  id: '...',
  valid: true
}
```

#### < question.winner

Emitted when a user answer correctly to the question.

```js
{
  questionId: '...',
  userId: '...',
  rank: 1,
  points: 3
}
```

#### < question.end

Emitted when the question is finished.

```js
{
  time: 10,
  ranks: [
    {
      userId: 'xxx',
      score: 'xxx',
      rank: 1
    }
  ]
}
```
