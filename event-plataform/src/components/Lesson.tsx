import { CheckCircle, Lock } from 'phosphor-react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

// Quais propriedades o componente vai receber
interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: 'live' | 'class';
}

function dateFormat(availableAt:Date) {
    const dateActual = new Date();

    const daysWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    
    const dateFormat  = new Date(availableAt);

    const availableDateFormat = ` ${daysWeek[dateFormat.getDay()]} • ${dateFormat.getDate()} de ${months[dateFormat.getMonth()]} • ${dateFormat.getHours()}h${dateFormat.getUTCMinutes()}0`;
    const isLessonAvailable = (dateActual.getDate() > dateFormat.getDate() || dateActual.getMonth() > dateFormat.getMonth()) ? true : false;

    return  {
        availableDateFormat,
        isLessonAvailable
    };
}

export function Lesson(props: LessonProps) {
    
    // Captura o parametro da url
    const { slug } = useParams<{ slug : string}>();  

    const { availableDateFormat, isLessonAvailable } = dateFormat(props.availableAt);

    const isActiveLesson = slug === props.slug; 

    return (
        <Link to={`/event/lesson/${props.slug}`} className={classNames('group', {
           'pointer-events-none' :  !isLessonAvailable ,
        })}>
            <span className="text-gray-300">
                {availableDateFormat}
            </span>
            <div 
                className={classNames("rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 transition-all duration-100", {
                    'bg-green-500 transition-all duration-700': isActiveLesson && isLessonAvailable,
                })}  
            > 
                <header className="flex items-center justify-between">
                    {
                        isLessonAvailable ? (
                            <span className={classNames("text-sm font-medium flex items-center gap-3", {
                                'text-white': isActiveLesson,
                                'text-blue-500': !isActiveLesson && isLessonAvailable,
                            })}>
                                <CheckCircle size={20}/>
                                Conteúdo liberado
                            </span>
                        ) :
                        (
                            <span className="text-sm text-orange-500 font-medium flex items-center gap-3">
                                <Lock size={20}/>
                                Em breve
                            </span>
                        )
                    }
                    
                    <span className={classNames("text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold", {
                        'border-white transition-all duration-100': isActiveLesson && isLessonAvailable,
                        'border-green-300 transition-all duration-100': !isActiveLesson && isLessonAvailable,
                    })}>
                        {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA' }
                    </span>
                </header>

                <strong className={classNames("mt-5 block transition-all duration-100", {
                    'text-white transition-all duration-100': isActiveLesson && isLessonAvailable,
                    'text-gray-200 transition-all duration-100': !isActiveLesson && isLessonAvailable
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}