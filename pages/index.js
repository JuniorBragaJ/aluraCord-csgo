import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

/*
    cores neutras antigas do config.json 
        {
          "000": "#FFFFFF",
          "050": "#F5F7FA",
          "100": "#E4E7EB",
          "200": "#CBD2D9",
          "300": "#9AA5B1",
          "400": "#52667A",
          "500": "#313D49",
          "600": "#29333D",
          "700": "#212931",
          "800": "#181F25",
          "900": "#101418",
          "999": "#080A0C"
        } 
*/

function GlobalStyle() {
    return (
        <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Open Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
    );
  }

function Titulo(props) {
    const Tag = props.tag || 'h1';
    return (
      <>
        <GlobalStyle/>
        <Tag>{props.children}</Tag>
        <style jsx>{`
              ${Tag} {
                  color: ${appConfig.theme.colors.neutrals['200']};
                  font-size: 24px;
                  font-weight: 600;
              }
              `}</style>
      </>
    );
  }

export default function PaginaInicial() {
    const username = 'juniorbragaj'

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
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo>Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals['200'] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            value={username}
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals['200'],
                                    mainColor: appConfig.theme.colors.neutrals['900'],
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
                                contrastColor: appConfig.theme.colors.neutrals['900'],
                                mainColor: appConfig.theme.colors.primary['500'],
                                mainColorLight: appConfig.theme.colors.primary['400'],
                                mainColorStrong: appConfig.theme.colors.primary['600'],
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
                            backgroundColor: appConfig.theme.colors.neutrals['500'],
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
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals['100'],
                                backgroundColor: appConfig.theme.colors.neutrals['800'],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                </Box>
            </Box>
        </>
    );
}