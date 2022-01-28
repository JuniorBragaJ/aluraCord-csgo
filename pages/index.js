import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';


function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
      <>
        <Tag>{props.children}</Tag>
        <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['000']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
      </>
    );
  }

export default function PaginaInicial() {
    const [username, setUsername] = useState('juniorbragaj');
    const routing = useRouter()

    const [dadosDoGithub, setDadosDoGithub] = useState({});

    React.useEffect (() => {
        fetch (`https://api.github.com/users/${username}`)
        .then((respostaDoServer) => {
            return respostaDoServer.json();
        }).then((respostaConvertida) => {
            setDadosDoGithub(respostaConvertida)
        })
    }, [username])

    return (
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['000'],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/counter-strike-global-offensive-dust-ii.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize:'', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '10px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals['900'],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (event) {
                            event.preventDefault();
                            routing.push('/chat')

                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo>Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['000'] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            onChange={function (event) {
                                const valor = event.target.value
                                setUsername(valor)
                            }}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals['050'],
                                    mainColor: appConfig.theme.colors.neutrals['000'],
                                    mainColorHighlight: appConfig.theme.colors.primary['500'],
                                    backgroundColor: appConfig.theme.colors.neutrals['800'],
                                },
                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals['000'],
                                mainColor: appConfig.theme.colors.primary['050'],
                                mainColorLight: appConfig.theme.colors.primary['400'],
                                backgroundColor: appConfig.theme.colors.neutrals['800'],
                            }}
                        />
                    </Box>
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.primary['050'],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals['900'],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body2"
                            styleSheet={{
                                color: appConfig.theme.colors.primary['000'],
                                backgroundColor: appConfig.theme.colors.neutrals['800'],
                                textAlign:'center',
                                padding: '3px 10px',
                                borderRadius: '10px'
                            }}
                        >
                        {dadosDoGithub.name}
                        </Text>
                        <Box
                            styleSheet={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                textAlign: 'center',
                                maxWidth: '200px',
                                backgroundColor: appConfig.theme.colors.primary['050'],
                            }}
                        >
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.primary['000'],
                                    backgroundColor: appConfig.theme.colors.neutrals['800'],
                                    margin: '3px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '5px',
                                    borderRadius: '10px'
                                }}
                                >
                                <Text
                                variant='heading5'
                                >Localização:
                                </Text> {dadosDoGithub.location ? dadosDoGithub.location : 'Indisponivel'}
                            </Text>
                            <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.primary['000'],
                                    backgroundColor: appConfig.theme.colors.neutrals['800'],
                                    margin: '3px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '5px',
                                    borderRadius: '10px'
                                }}
                                >
                                <Text
                                variant='heading5'
                                >Biografia:
                                </Text> {dadosDoGithub.bio ? dadosDoGithub.bio : 'Indisponivel'}
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}