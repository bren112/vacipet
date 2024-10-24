import { useState, useEffect } from 'react'; 
import { supabase } from "../../supabase/supabase.js";
import './meusPets.css';

function MeusPets() {
    const [pets, setPets] = useState([]);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [numeroUsuario, setNumeroUsuario] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user_data'));
        if (userData) {
            setUsuarioLogado(userData.nome);
            fetchUserNumber(userData.email);
        }
    }, []);

    const fetchUserNumber = async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('numero')
            .eq('email', email)
            .single();

        if (error) {
            console.error('Erro ao buscar número do usuário:', error);
        } else {
            setNumeroUsuario(data.numero);
            fetchPets(data.numero);
        }
    };

    const fetchPets = async (numeroUsuario) => {
        const { data, error } = await supabase
            .from('meu_pet')
            .select('*')
            .eq('nmr_user', numeroUsuario);

        if (error) {
            console.error('Erro ao buscar pets:', error);
        } else {
            setPets(data);
        }
    };

    return (
        <div className="meus-pets-container">
            {/* {usuarioLogado && (
                <div className="usuario-logado">
                    <h2>Bem-vindo, {usuarioLogado}!</h2>
                    {numeroUsuario !== null && <span>(Número: {numeroUsuario})</span>}
                </div>
            )} */}
            <h1 id='title'>Meus Pets</h1>
            <br/>
            <div className="pets-container">
                
                {pets.length === 0 ? (
                    <p>Você ainda não tem pets cadastrados.</p>
                ) : (
                    <ul className="pets-list">
                        {pets.map(pet => (
                            <li className="pet-item" key={pet.id}>
                                <h3 className="pet-name">{pet.nome}</h3>
                                {pet.imagem && <img className="pet-image" src={pet.imagem} alt={pet.nome} />}
                                <div className="pet-details">
                                    <p>Tipo: {pet.tipo}</p>
                                    <p>Raça: {pet.raca}</p>
                                    <p>Sexo: {pet.sexo}</p>
                                    <p>Data de Nascimento: {pet.data_nascimento}</p>
                                    <p>Restrições: {pet.restricoes}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default MeusPets;
