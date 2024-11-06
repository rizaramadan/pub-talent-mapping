export async function GET(request: Request) : Promise<Response> {
    return await getResult(request);
}


async function getResult(request: Request) {
    // Extract the token from the Authorization header
    const authHeader = request.headers.get('Authorization');
    let token = '';

    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1]; // Extract the token part
    }

    // Check if the token is missing
    if (!token) {
        return new Response(JSON.stringify({ error: 'Token is missing' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Proceed with your logic, e.g., verifying the token
    // const userData = await verifyToken(token); // Example function to verify the token

    // If token verification fails, return an error response
    // if (!userData) {
    //     return new Response(JSON.stringify({ error: 'Invalid token' }), {
    //         status: 403,
    //         headers: { 'Content-Type': 'application/json' },
    //     });
    // }

    // ... your existing logic to get results ...

    // Example response after processing
    return new Response(JSON.stringify({ message: 'Results fetched successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}