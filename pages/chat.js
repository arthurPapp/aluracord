import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js';
import React from 'react';
import appConfig from '../config.json'
import { useRouter } from 'next/router'
import { ButtonSendSticker } from '../src/components/ButtonSendSticker';
import { MessageList } from '../src/components/MessageList';

const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNzem1ybnJzYmF1Z290emplb2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI3MjA3NjIsImV4cCI6MTk2ODI5Njc2Mn0.EKdQx9nvPUs3QsBGUn0FtTeQuSFOGhrotzzVa3qbb1Y';
const SUPABASE_URL = 'https://cszmrnrsbaugotzjeoli.supabase.co';
const supabeseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

function escutaMensagemEmTempoReal(adicionaMensagem) {
    return supabeseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            // console.log('supabeseClient ' + respostaLive);
            adicionaMensagem(respostaLive.new);
        }).subscribe();
}

// fetch(`${SUPABASE_URL}/rest/v1/mensagens?select=*`, {
//     headers: {
//         'Content-Type': 'application/json',
//         'apiKey': SUPABASE_ANON_KEY,
//         'Authorizathion': 'Bearer ' + SUPABASE_ANON_KEY,
//     }
// }).then((res) => {
//     return res.json();
// }).then((response) => {
//     console.log(response);

// });

/**
 * Desafios 
 * [] Tela de loading
 * [] mouse ouver com profile da pessoal
 * @returns 
 */


export default function ChatPage() {
    const roteamento = useRouter();
    const usuarioLogado = roteamento.query.username === '' ? 'anonimo' : roteamento.query.username;
    const [mensagem, setMensagem] = React.useState('');
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

    //execulta quando acontece algum efeito(para lidar com aquilo q foge do fluxo padrão)
    React.useEffect(() => {
        //efeito colateral (não faz parte do fluxo padrão)
        supabeseClient
            .from('mensagens')
            .select('*')
            .order('id', { ascending: false })
            .then(({ data }) => {
                console.log(data);
                setListaDeMensagens(data);
            });
        //Quero usar um valor de referencia (object/arrays)
        //passar uma função pro setState
        escutaMensagemEmTempoReal((novaMensagem) => {
            // console.log('escutaMensagemEmTempoReal' + novaMensagem);
            setListaDeMensagens((valorDaLista) => {
                return [novaMensagem, ...valorDaLista]
            });
        });

    }, []);

    function handlerNovaMensagem(novaMensagem) {
        const mensagem = {
            texto: novaMensagem,
            de: usuarioLogado,
            // id: listaDeMensagens.length + 1
        };

        if (mensagem.texto !== '') {
            supabeseClient
                .from('mensagens')
                .insert([mensagem])
                .then(({ data }) => {
                    console.log('mensagem criada: ', data);
                    // setListaDeMensagens([data[0], ...listaDeMensagens]);
                });
        }
        // se inverter a ordem entre as entrada e lista existente, muda a ordem de saida no map
        //setListaDeMensagens([mensagem, ...listaDeMensagens]);
        setMensagem('');
    }

    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[500],
                backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
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
                    backgroundColor: appConfig.theme.colors.neutrals[700],
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
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* <MessageList /> */}
                    <MessageList mensagens={listaDeMensagens} />

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}

                        onSubmit={function (event) {
                            event.preventDefault();
                            // console.log(event)
                            handlerNovaMensagem(mensagem);

                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                // console.log(event.target.value);
                                setMensagem(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    // console.log(event)
                                    handlerNovaMensagem(mensagem);
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
                            type='submit'
                            label='enviar'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                        {/* Callback = chamada de retorno */}
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                handlerNovaMensagem(`:sticker:${sticker}`)
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Box >
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
                />
            </Box>
        </>
    )
}