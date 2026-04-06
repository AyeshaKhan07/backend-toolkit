export function responseParser(options: {errors?: any, message?: string, data?: any, statusCode?: number}) {
    if(options.errors) {
        return JSON.stringify({
            statusCode: options.statusCode || 400,
            statusMessage: "Bad Request",
            message: options.message || "Error",
            errors: options.errors
        });
    }
    return JSON.stringify({
        statusCode: options.statusCode || 200,
        statusMessage: "OK",
        message: options.message || "Success",
        data: options.data || null
    });
}