import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export let errorRate = new Rate("errors");

export let options = {
  vus: 200,
  duration: "300s",
  thresholds: {
    errors: ["rate<0.01"]
  },
  rps: 10000
};


export default function() {
  let rand = Math.floor((Math.random() * 10000000) + 1);
  let res = http.get(`http://localhost:3001/artists/${rand}`);
  check(res, {
    "status was 200": (r) => r.status == 200,
    "transaction time OK": (r) => r.timings.duration < 200
  }) || errorRate.add(1);
};