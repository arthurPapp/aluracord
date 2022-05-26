import React from 'react';
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import appConfig from '../../config.json';

export function MessageList(props) {
    // console.log('MessageList', props);
    return (

        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                // flexDirection e onde manda na ordem de apresentação
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
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                            }}
                        >
                            {mensagem.de.startsWith('anonimo') ? (
                                <Image
                                    styleSheet={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        display: 'inline-block',
                                        marginRight: '8px',
                                    }}

                                    src={`https://art.pixilart.com/ef9ac2360ea67b0.png`}
                                />
                            )
                                :
                                (
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
                                )
                            }

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
                        {mensagem.texto.startsWith(':sticker:')
                            ? (
                                <Image src={mensagem.texto.replace(':sticker:', '')} />
                            )
                            :
                            (
                                mensagem.texto
                            )
                        }
                        {/* {mensagem.texto} */}
                        {/* <Button
                            // type='submit'
                            label='X'
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                            styleSheet={{
                                display: 'inline',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                marginLeft: '90%',
                                // width: '50px', maxWidth: '50px',
                                borderRadius: '5px', padding: '5px',
                                boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)'
                            }}
                            onClick={function() {
                                var mensagens = props.mensagens.filter(function (value, index, arr) {
                                    console.log(mensagem.id);
                                    return value = mensagem.id;
                                });
                                console.log('aa', mensagens);
                            }}
                        /> */}
                    </Text>
                );
            })}

        </Box>
    )
}