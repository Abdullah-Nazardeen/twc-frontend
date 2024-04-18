export async function fetchWithoutAuthorization({
  method,
  url,
  data,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data: any;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL + url}`,
      {
        method: method || "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" ? JSON.stringify(data) : null,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    console.log("Error: ", error);
    throw new Error("Failed to fetch data");
  }
}

export async function fetchWithAuthorization({
  method,
  url,
  data,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: any;
}) {
  try {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("twc-token");
    }

    if (!token) {
      throw new Error("User ID or token not found in localStorage");
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL + url}`,
      {
        method: method || "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: method !== "GET" ? JSON.stringify(data) : null,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  } catch (error) {
    throw new Error("Failed to fetch data with authorization");
  }
}
