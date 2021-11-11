const API_URL =
  process.env.NODE_ENV == "production"
    ? "https://kepler-mission-control.herokuapp.com/v1"
    : "http://localhost:8000/v1";

async function httpGetPlanets() {
  try {
    const response = await fetch(`${API_URL}/planets`);
    return await response.json();
  } catch (error) {
    console.log(error.message);
  }
}

async function httpGetLaunches() {
  try {
    const launches = await (await fetch(`${API_URL}/launches`)).json();
    return launches.sort((a, b) => a.flightNumber - b.flightNumber);
  } catch (error) {
    console.log(error.message);
  }
}

async function httpSubmitLaunch(launch) {
  try {
    return await fetch(`${API_URL}/launches`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
