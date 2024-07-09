import { hc } from 'hono/client';
import { v4 as uuidv4 } from 'uuid';


const sessionID = uuidv4();

const SecurityHub = () => {

    // TODO: For Future use
    // client.ts
    const websocketClient = hc('http://localhost:5001');
    const ws = websocketClient.ws.$ws(0);

    ws.addEventListener('open', () => {
        ws.send(JSON.stringify({
            timestamp: new Date().toString(),
            id: 1,
            sessionID,
            message: "FamilyApps:SecurityHub -- Connected",
        }))
        // setInterval(() => {
        //     ws.send(JSON.stringify({ 
        //         timestamp: new Date().toString(), 
        //         id: 1,
        //         appID: "FamilyApps",
        //         sessionID
        //     }))
        // }, 20000);
    });

    return (
        <div>SecurityHub</div>
    )
}

export default SecurityHub