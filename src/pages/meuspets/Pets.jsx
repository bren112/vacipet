import { useState, useEffect } from 'react'; 
import { supabase } from "../../supabase/supabase.js";
import './pet.css'; 

function CreatePet() {
    const [nome, setNome] = useState('');
    const [tipo, setTipo] = useState('');
    const [raca, setRaca] = useState(''); 
    const [sexo, setSexo] = useState(''); 
    const [dataNascimento, setDataNascimento] = useState('');
    const [restricoes, setRestricoes] = useState('');
    const [imagem, setImagem] = useState('');
    const [numeroUsuario, setNumeroUsuario] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [step, setStep] = useState(0); // Novo estado para controlar os passos

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
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user_data'); 
        window.location.href = '/'; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (numeroUsuario === null) {
            alert("Erro: usuário não está logado ou número não encontrado.");
            return;
        }

        const { error } = await supabase
            .from('meu_pet')
            .insert([ 
                { 
                    nome, 
                    tipo, 
                    raca, 
                    sexo, 
                    data_nascimento: dataNascimento, 
                    restricoes, 
                    imagem,
                    nmr_user: numeroUsuario 
                }
            ]);

        if (error) {
            console.error('Erro ao criar pet:', error);
        } else {
            setNome('');
            setTipo('');
            setRaca(''); 
            setSexo(''); 
            setDataNascimento('');
            setRestricoes('');
            setImagem('');
            alert('Pet criado com sucesso!');
        }
    };

    const handleNext = (e) => { // Adicione 'e' como argumento
        e.preventDefault(); // Adicione essa linha
        // Verificação de campos obrigatórios
        if ((step === 0 && !nome) || 
            (step === 1 && !tipo) || 
            (step === 2 && !raca) || 
            (step === 3 && !sexo) || 
            (step === 4 && !dataNascimento) || 
            (step === 5 && !imagem)) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        if (step < 5) {
            setStep(step + 1);
        } else {
            handleSubmit(e); // Chama a função de submit se estiver no último passo
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setStep(step - 1);
        }
    };

    return (
        <>
        <br/>
        <br/>
            {usuarioLogado && (
                <div className="welcome-container">
                    <h2 id='welcome'>Bem-vindo, <span id='span'>{usuarioLogado}!</span></h2>
                    <button className="logout-button" onClick={handleLogout}>Sair</button>
                </div>
            )}
            <br/>
            <div className="form-wrapper">
                <h1>Criar Meu Pet</h1>
                <form className="pet-form" onSubmit={handleSubmit}>
                    <div className={`step-container step-${step}`}>
                        {step === 0 && (
                            <div className="form-group">
                                <label>Nome:</label>
                                <input 
                                    type="text" 
                                    value={nome} 
                                    onChange={(e) => setNome(e.target.value)} 
                                    required 
                                />
                            </div>
                        )}
                        {step === 1 && (
                            <div className="form-group">
                                <label>Tipo:</label>
                                <input 
                                    type="text" 
                                    value={tipo} 
                                    onChange={(e) => setTipo(e.target.value)} 
                                    required 
                                />
                            </div>
                        )}
                        {step === 2 && (
                            <div className="form-group">
                                <label>Raça:</label>
                                <input 
                                    type="text" 
                                    value={raca} 
                                    onChange={(e) => setRaca(e.target.value)} 
                                    required 
                                />
                            </div>
                        )}
                        {step === 3 && (
                            <div className="form-group">
                                <label>Sexo:</label>
                                <select 
                                    value={sexo} 
                                    onChange={(e) => setSexo(e.target.value)} 
                                    required
                                >
                                    <option value="">Selecione</option>
                                    <option value="Macho">Macho</option>
                                    <option value="Fêmea">Fêmea</option>
                                </select>
                            </div>
                        )}
                        {step === 4 && (
                            <div className="form-group">
                                <label>Data de Nascimento:</label>
                                <input 
                                    type="date" 
                                    value={dataNascimento} 
                                    onChange={(e) => setDataNascimento(e.target.value)} 
                                    required 
                                />
                            </div>
                        )}
                        {step === 5 && (
                            <>
                                <div className="form-group">
                                    <label>Restrições:</label>
                                    <textarea 
                                        value={restricoes} 
                                        onChange={(e) => setRestricoes(e.target.value)} 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Imagem URL:</label>
                                    <input 
                                        type="text" 
                                        value={imagem} 
                                        onChange={(e) => setImagem(e.target.value)} 
                                    />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="form-navigation">
                        {step > 0 && <button type="button" onClick={handleBack}>Voltar</button>}
                        <button type="button" onClick={handleNext}>
                            {step < 5 ? "Próximo" : "Criar Pet"}
                        </button>
                    </div>
                </form>
            </div>
            <br/>
        </>
    );
}

export default CreatePet;
