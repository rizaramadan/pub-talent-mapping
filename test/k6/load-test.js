import http from 'k6/http';
import { sleep, check } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export let options = {
    vus: 1000, // Virtual users
    duration: '3s', // Duration of the test
};

const ROOT = 'http://localhost:4000'; // Replace with your actual server URL

function generateRandomResponses() {
    const responses = {};
    for (let i = 1; i <= 28; i++) {
        responses[`respon_${i}`] = Math.random() < 0.5 ? 'a' : 'b';
    }
    return responses;
}

export default function loadTest() {
    const userId = uuidv4();
    const fullName = userId;

    let res1 = http.get(`${ROOT}/?user-id=${userId}&fullname=${fullName}`);
    check(res1, { 'GET /?user-id successful': (r) => r.status === 200 });

    let res2 = http.get(`${ROOT}/api/count-submission/${userId}`);
    check(res2, { 'GET /api/count-submission successful': (r) => r.status === 200 });

    const responses = generateRandomResponses();
    const payload = JSON.stringify({
        SubmitArgs: {
            userId: userId,
            ...responses,
            fullName: fullName,
        },
    });

    console.log(payload);

    let res3 = http.post(`${ROOT}/api/submit/${userId}`, payload, {
        headers: { 'Content-Type': 'application/json' },
    });
    const postSuccess = JSON.parse(res3.body).userId === userId;

    check(res3, {
        'POST /api/submit successful': () => postSuccess,
    });
    if (!postSuccess) {
        console.log(`POST /api/submit failed: Expected userId ${userId}, got ${res3.body}`);
    }

    let res4 = http.get(`${ROOT}/api/get-result/${userId}`);

    const getResult = JSON.parse(res4.body);

    const getResultSuccess =
        getResult.userId === userId && getResult.fullName === fullName;
    check(res4, {
        'GET /get-result successful': () => getResultSuccess,
    });
    if (!getResultSuccess) {
        console.log(
            `GET /get-result failed: Expected userId ${userId} and fullName ${fullName}, got ${res4.body}`
        );
    }

    sleep(1);
}
