import { gql, useQuery } from "@apollo/client";
import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

// Buscar o primeiro vídeo pela sua data de criação 
const GET_FIRST_SLUG_QUERY = gql`
  query GET_FIRST_SLUG_QUERY {
        lessons(orderBy: availableAt_ASC) {
            slug 
    }
}
`;

const GET_SUBSCRIBERS = gql`
    query GET_SUBSCRIBERS {
        subscribers {
          id,
          name, 
          email
        }
}`;
  
interface GetSubscribers {
    subscribers: {
        id: string,
        name: string,
        email: string 
    }[]
}

export function Login() {
    // Ao ser chamado na tela carregar todos os users cadastrados
    const { data }  = useQuery<GetSubscribers>(GET_SUBSCRIBERS);
    const firstSlug  = useQuery(GET_FIRST_SLUG_QUERY);
    const navegate =  useNavigate(); 
    
    // Criando estados de nome e email
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    function handleLogin(event: FormEvent) {
        event.preventDefault();

        const subscriber = data?.subscribers?.find(i => i.email == email);

        if(!subscriber) {
            console.log('Inscreva-se');
        } else {
            navegate(`/event/lesson/${firstSlug.data.lessons[0].slug}`);
        }

    }

    return (
        <>
            <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex justify-center items-center p-10 gap-8 h-screen">
                <div className="p-2 border border-gray-500 w-[450px] bg-gray-700">
                    <div className="p-6 flex justify-center">
                        <Logo />
                    </div>

                    <form className="p-4" onSubmit={handleLogin}>
                        <input type="text" 
                               placeholder="Seu nome completo"
                               className="block bg-gray-900 rounded px-8 h-14 border-b-2 border-green-500 w-full text-lg"    
                               onChange={event => setName(event.target.value)}    
                        />

                        <input type="email" 
                               placeholder="Digite seu e-mail"
                               className="block bg-gray-900 rounded px-8 h-14 border-b-2 border-green-500 w-full text-lg mt-4"
                               onChange={event => setEmail(event.target.value)}   
                        />

                        <button type="submit"
                                className="mt-6 bg-green-500 uppercase py-4 rounded font-bold text-lg hover:bg-green-700 transition-all duration-500 w-full"
                        >
                            Logar
                        </button>
                    </form>
                    
                    <Link to="/" className="flex items-center p-4 gap-3 hover:text-green-300 transition-all duration-500">
                        <ArrowLeft size={32} /><span>Voltar</span>
                    </Link>
                </div>
            </div>
        </>
    );
}