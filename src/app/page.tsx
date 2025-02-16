export default function Home() {
    const socket = new WebSocket('ws://localhost:3500');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('submit');
    }
    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
              <input 
              type="text" />
            </form>
        </div>
    );
}
