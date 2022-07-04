import { FormEvent, useState } from "react";
import { Logo } from "../components/Logo";
import { Link, useNavigate } from 'react-router-dom';
import { gql, useMutation, useQuery } from "@apollo/client";
import { SignIn } from "phosphor-react";

// Buscar o primeiro vídeo pela sua data de criação 
const GET_FIRST_SLUG_QUERY = gql`
  query GET_FIRST_SLUG_QUERY {
        lessons(orderBy: availableAt_ASC) {
            slug 
    }
}
`;

// Criando mutation para inscrição
const CREATE_SUBSCRIBER_MUTATION = gql`
    mutation CreateSubscriber($name: String!, $email: String!) {
        createSubscriber(data: {name: $name, email: $email}) {
            id
        }
    }
`;

export function Subscribe() {
    const navigate = useNavigate();
    const { data } = useQuery(GET_FIRST_SLUG_QUERY);
    
    // Criando estados do nome e email
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Usando mutation 
    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIBER_MUTATION);

    const handleSubscribe = async (event: FormEvent) => {
        event.preventDefault();

        await createSubscriber({
            variables: {
                name, 
                email,
            }
        });

        navigate(`/event/lesson/${data.lessons[0].slug}`);
    };

    return (    
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center p-4">
            <div className="w-full max-w-[1100px] flex items-center justify-center flex-wrap gap-5 mt-20 mx-auto">
                <div className="max-w-[640px]">
                    <Logo />

                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Construa uma <strong className="text-blue-500"> aplicação completa</strong>, do zero, com <strong className="text-blue-500">React JS</strong>
                    </h1>

                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Em apenas uma semana você vai dominar na prática uma das tecnologias mais utilizadas e com alta demanda para acessar as melhores oportunidades do mercado.
                    </p>
                </div>
                <div className="p-8 bg-gray-700 border border-gray-500 rounded mt-5">
                    <strong className="text-2xl mb-6 block">
                        Inscreva-se gratuitamente
                    </strong>

                    <form onSubmit={handleSubscribe}
                          className="flex flex-col gap-2 w-full" 
                    >
                        <input 
                            type="text"
                            className="bg-gray-900 rounded px-5 h-14" 
                            placeholder="Seu nome completo"
                            onChange={event => setName(event.target.value)}
                        />

                        <input 
                            type="email"
                            className="bg-gray-900 rounded px-5 h-14" 
                            placeholder="Digite seu e-mail"
                            onChange={event => setEmail(event.target.value)}
                        />

                        <button type="submit"
                                disabled={loading} 
                                className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            Garantir minha vaga
                        </button>

                        <Link to="/login" className="flex items-center justify-end gap-2 hover:text-green-300">
                            Realizar login
                            <SignIn size={32} color="#ffffff" />
                        </Link>                        
                    </form>
                </div>
            </div>

            <img src="/src/assets/code-mockup.png" className="mt-10" alt="" />
        </div>
    );
}