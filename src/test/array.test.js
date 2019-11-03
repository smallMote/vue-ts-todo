
const arr = [
  { name: 'Larry' },
  { name: 'Marry' },
  { name: 'jone' }
];

function update(arr, obj) {
  let key = Object.keys({ name: 'Larry' })[0];
  let val = obj[key];
  let newArr = arr;
  let index = arr.findIndex(item => item[key] === val);
  newArr[index] = obj;
  return newArr
}

function filterTest() {
  const arr = [
    {
      "id": "5dbd9c5a8d36bcc062561ff1",
      "createdAt": "2019-11-02T15:10:18.241Z",
      "updatedAt": "2019-11-02T15:27:32.903Z",
      "date": 1572707417958,
      "group": "default",
      "active": true,
      "content": "3"
    },
    {
      "id": "5dbb856800d58537477a491f",
      "createdAt": "2019-11-01T01:07:52.169Z",
      "updatedAt": "2019-11-02T15:27:31.597Z",
      "date": 1572570474937,
      "group": "default",
      "active": true,
      "content": "1"
    }
  ];

  return arr.filter(item => item['content'] === '3')
}
console.log(filterTest())
