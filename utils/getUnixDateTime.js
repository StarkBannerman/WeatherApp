

export default async function getUnixDateTime(){
    const currentUnixTimestamp = Math.floor(Date.now() / 1000);

    return currentUnixTimestamp;

}