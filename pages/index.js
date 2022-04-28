import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';

//importando next
import { useRouter } from 'next/router'
import appConfig from '../config.json'



//repartindo componentes
function Titulo(props) {
    console.log(props.children);
    // o react js precisa saber q ele esta pegando o valor de um variavel para isso usar {}
    // o <style jsx> precisa de uma tag pai unica para isso usamos tags fantasmas <></>
    // assim quando passo a tag dentro da tag ela passa a ser um propert
    const Tag = props.tag || 'h1';

    // tag style tem a possibilidade de usar template string  
    return (
        <>
            <Tag>{props.children}</Tag>
            {/* se der erro add '' dentro do array*/}
            <style jsx>{`
                    ${Tag} {                       
                        color: ${appConfig.theme.colors.neutrals['000']};
                    }
            `}</style>
        </>


    )
}

//export default utilizado para forma default da pagina 
export default function PaginaInicial() {
    // const username = 'arthurPapp';
    const [username, setUsername] = React.useState('anonimo');
    const roteamento = useRouter();
    const [mostraImagem, setmostraImagem] = React.useState('https://art.pixilart.com/ef9ac2360ea67b0.png');
    return (
        <>

            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary[500],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)',
                    backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
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
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit={function (infosDoEvento) {
                            infosDoEvento.preventDefault();
                            //hoteamento nextJs
                            roteamento.push('/chat')

                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Boas vindas de volta!</Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
                            {appConfig.name}
                        </Text>

                        <TextField
                            fullWidth
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[900],
                                    mainColorHighlight: appConfig.theme.colors.primary[500],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                            value={username}
                            onChange={function (event) {
                                console.log(event.target.value);
                                //Trocando o valor da variavel atravez do react
                                setUsername(event.target.value);
                                if (event.target.value.length > 2) {
                                    setmostraImagem(`https://github.com/${event.target.value}.png`)
                                } else {
                                    setmostraImagem(`https://art.pixilart.com/ef9ac2360ea67b0.png`)
                                }

                            }}
                        />
                        <Button
                            type='submit'
                            label='Entrar'
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />

                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
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
                            src={mostraImagem}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}

                </Box>
            </Box>

        </>
    );
}

//componente react
// atravez do <style jsx> o react cria tag class automaticamente dentro de cada component
// function HomePage() {
    //react permite vc passar a tag que vc quer usar por ex tag="h2" usada no Titulo
    //<GlobalStyle /> criada pelo dev, é uma convenção para o CSS global
//     return (
//         <div>
//             {/* comando para comentar - vai salvar agora kkk  */}
//             <GlobalStyle />
//             <Titulo tag="h2">Boas vindas de volta!</Titulo>
//             <h2>Discord - Alura Matrix</h2>

//         </div>
//     )

// }

// export default HomePage