const redis = require('redis')

const client = redis.createClient({
    url: "redis://localhost:6379",
})

client.on("error", (error) => console.error("Redis error:", error))

async function main() {
    try {
        await client.connect()
        await client.set("name", "Ramki", { EX: 10 })
        console.log("Data Available:", await client.get("name"))
    } catch (error) {
        console.error("Redis connection failed:", error)
        process.exit(1)
    }
}

main()

setInterval(async () => {
    try {
        console.log(await client.get("name"))
    } catch (error) {
        console.error("Redis read failed:", error)
    }
}, 3000)

module.exports = client