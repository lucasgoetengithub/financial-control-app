import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'
import LocalStorageService from '../app/service/localstorageService'
import { mensagemErro } from '../components/toastr'
import { AuthContext  } from '../main/provedorAutenticacao'

class Login extends React.Component{

    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch( erro => {
           mensagemErro(erro.response.data)
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios')
    }

    render(){
        return (

            <S.Container>
                <Header/>

                <S.Title>
                    <h3>Acessar controle financeiro</h3>                    
                </S.Title>

                <S.Content>

                <Stack width='20%' spacing={0.8} direction="column">
                        <TextField
                            required
                            id="outlined-required"
                            label="Usuário"
                            onChange={(e) => [setEmail(e.target.value), setError("")]}
                        />

                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            onChange={(e) => [setSenha(e.target.value), setError("")]}
                        />
                        <S.labelError>{error}</S.labelError>

                        <Button onClick={Entrar}>ENTRAR</Button>
                        <S.LabelSignup>
                        Não tem uma conta?
                        <S.Strong>
                        <Link to="/register">&nbsp;Registre-se</Link>
                        </S.Strong>
                    </S.LabelSignup>
                </Stack>
                
                </S.Content>

                <Footer/>
            </S.Container>

        )
    }
}

Login.contextType = AuthContext

export default withRouter( Login )