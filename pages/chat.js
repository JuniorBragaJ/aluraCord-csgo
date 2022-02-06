import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU2NzkwNiwiZXhwIjoxOTU5MTQzOTA2fQ.1ii5K-c_8WpuyUS5VUcqiO5fYaiTkz9F8yXmwptxgAU';
const SUPABASE_URL = 'https://hotyfokxsvavslhwraeq.supabase.co';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


// fica de 'escutando' toda vez que uma nova mensagem e adicionada ao banco de dados
function escutaMensagensEmTempoReal(adicionaMensagem) {
    // passei 'adicionaMensagem' como argumento e é usado como funcao dentro da
    // biblioteca do supabase
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}


export default function ChatPage() {
    const routing = useRouter();
    const usuarioLogado = routing.query.username;

    const [mensagem, setMensagem] = useState('');
    const [listaDeMensagem, setListaDeMensagem] = useState([])


    // API do supaBase para fazer o fetch de forma mais enxuta e simples
    React.useEffect(() => {
        supabaseClient
            .from('mensagens') //Busca tabela 'mensagens' criado no supabase
            .select('*') //Seleciona tudo
            .order('id', { ascending: false },)
            .then(({ data }) => { //Entao pega os dados de retorno e atualiza array de mensagens
                setListaDeMensagem(data)
            })
            // eu passo essa arrow function dentro de 'escutaNovaMensagemEmTempoReal' 
            // porque ela é usada dentro do objeto .ON do supabase, é o callBack
        escutaMensagensEmTempoReal((novaMensagem) => {
            setListaDeMensagem((valorAtualDaLista) => {
                return [
                    novaMensagem,
                    ...valorAtualDaLista
                ]
            })
        });
    }, [])

    function handleNovaMensagem(novaMensagem) {
        const mensagem = {
            /* id: listaDeMensagem.length + 1, */     //isso foi comentado pois o supabase ja da um id unico para a mensagem
            de: usuarioLogado,
            texto: novaMensagem,
        };

        supabaseClient
            .from('mensagens') //lista criada no supabase
            .insert([
                mensagem
            ])
            .then((response) => {
                console.log('o que ta vindo como resposta', response)
            })
        setMensagem('');
    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['000'],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/counter-strike-global-offensive-dust-ii.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals['800'],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />

                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals['900'],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    <MessageList mensagens={listaDeMensagem} />

                    <Box
                        as="form"
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleNovaMensagem(mensagem)
                        }
                        }
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handleNovaMensagem(`:sticker: ${sticker}`)
                            }}
                        />
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value
                                setMensagem(valor)
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();

                                    handleNovaMensagem(mensagem);
                                }
                            }}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            variant='tertiary'
                            colorVariant='neutral'
                            onClick={() => {
                                handleNovaMensagem(mensagem)
                            }}
                            label='Enviar'
                            styleSheet={{
                                textAlign: 'center',
                                alignItems: 'center',
                                backgroundColor: appConfig.theme.colors.neutrals['800']
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                    styleSheet={{
                        backgroundColor: appConfig.theme.colors.neutrals['900']
                    }}
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'auto',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals['800'],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />
                            <Text tag="strong">
                                {mensagem.de}
                            </Text>
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto.startsWith(':sticker:') //se a mensagem for um sticker ele retorna so o link do sticker para jogar na tela
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')}
                                    styleSheet={{ width: '25%' }}
                                />
                            )
                            : (
                                mensagem.texto
                            )}
                    </Text>
                )
            })}
        </Box>
    )
}