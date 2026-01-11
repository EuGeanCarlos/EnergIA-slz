  // Estado da aplicação
        const estado = {
            usuario: null,
            aparelhos: [],
            relatorio: null
        };

        // Elementos do DOM
        const telas = document.querySelectorAll('.tela');
        const botoesNavegacao = document.querySelectorAll('.nav-btn');
        const formUsuario = document.getElementById('formUsuario');
        const formAparelho = document.getElementById('formAparelho');
        const containerAparelhos = document.getElementById('aparelhos-container');
        const btnGerarRelatorio = document.getElementById('btn-gerar-relatorio');
        const notification = document.getElementById('notification');

        // URLs da API (substituir pelos endpoints reais)
        const API_URLS = {
            usuario: 'https://api.energiaslz.com/usuarios',
            aparelho: 'https://api.energiaslz.com/aparelhos',
            relatorio: 'https://api.energiaslz.com/relatorio'
        };

        // Funções de navegação
        botoesNavegacao.forEach(botao => {
            botao.addEventListener('click', () => {
                const telaAlvo = botao.getAttribute('data-tela');
                
                // Atualiza botões ativos
                botoesNavegacao.forEach(b => b.classList.remove('active'));
                botao.classList.add('active');
                
                // Mostra a tela correspondente
                telas.forEach(tela => {
                    tela.classList.remove('ativa');
                    if (tela.id === telaAlvo) {
                        tela.classList.add('ativa');
                    }
                });
            });
        });

        // Função para mostrar notificações
        function mostrarNotificacao(mensagem, tipo = 'sucesso') {
            notification.textContent = mensagem;
            notification.className = `notification ${tipo} show`;
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Funções para simular chamadas de API (substituir por fetch real)
        async function salvarUsuarioAPI(usuario) {
            // Simulação de chamada API
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('Usuário salvo via API:', usuario);
                    resolve({ success: true, id: Date.now() });
                }, 500);
            });
        }

        async function salvarAparelhoAPI(aparelho) {
            // Simulação de chamada API
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('Aparelho salvo via API:', aparelho);
                    resolve({ success: true, id: Date.now() });
                }, 500);
            });
        }

        async function buscarRelatorioAPI(usuarioId) {
            // Simulação de chamada API
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log('Relatório buscado via API para usuário:', usuarioId);
                    
                    // Cálculos simulados
                    const consumoTotal = estado.aparelhos.reduce((total, aparelho) => {
                        const consumoDiario = (aparelho.potencia * aparelho.horas_uso * aparelho.quantidade) / 1000;
                        return total + (consumoDiario * 30); // Consumo mensal
                    }, 0);
                    
                    const tarifa = estado.usuario ? estado.usuario.tarifa : 0.75;
                    const custoTotal = consumoTotal * tarifa;
                    const emissaoCO2 = consumoTotal * 0.084; // Fator de emissão médio no Brasil
                    
                    const recomendacoes = gerarRecomendacoes(estado.aparelhos, consumoTotal);
                    
                    resolve({
                        consumoMensal: consumoTotal.toFixed(2),
                        custoMensal: custoTotal.toFixed(2),
                        emissaoCO2: emissaoCO2.toFixed(2),
                        recomendacoes: recomendacoes
                    });
                }, 800);
            });
        }

        // Cadastro de usuário
        formUsuario.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const usuario = {
                nome: document.getElementById('nome').value,
                email: document.getElementById('email').value,
                telefone: document.getElementById('telefone').value,
                endereco: document.getElementById('endereco').value,
                tarifa: parseFloat(document.getElementById('tarifa').value),
                num_residentes: parseInt(document.getElementById('num_residentes').value),
                data_cadastro: new Date().toISOString()
            };
            
            try {
                // Salvar usuário via API
                const resultado = await salvarUsuarioAPI(usuario);
                
                if (resultado.success) {
                    estado.usuario = usuario;
                    mostrarNotificacao('Usuário cadastrado com sucesso!', 'sucesso');
                    
                    // Navegar para a próxima tela
                    document.querySelector('[data-tela="aparelhos"]').click();
                }
            } catch (error) {
                console.error('Erro ao salvar usuário:', error);
                mostrarNotificacao('Erro ao cadastrar usuário. Tente novamente.', 'erro');
            }
        });

        // Cadastro de aparelhos
        formAparelho.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const aparelho = {
                nome: document.getElementById('nome_aparelho').value,
                potencia: parseInt(document.getElementById('potencia').value),
                horas_uso: parseFloat(document.getElementById('horas_uso').value),
                quantidade: parseInt(document.getElementById('quantidade').value)
            };
            
            try {
                // Salvar aparelho via API
                const resultado = await salvarAparelhoAPI(aparelho);
                
                if (resultado.success) {
                    estado.aparelhos.push({...aparelho, id: resultado.id});
                    mostrarNotificacao('Aparelho adicionado com sucesso!', 'sucesso');
                    renderizarAparelhos();
                    formAparelho.reset();
                }
            } catch (error) {
                console.error('Erro ao salvar aparelho:', error);
                mostrarNotificacao('Erro ao adicionar aparelho. Tente novamente.', 'erro');
            }
        });

        // Renderizar lista de aparelhos
        function renderizarAparelhos() {
            containerAparelhos.innerHTML = '';
            
            if (estado.aparelhos.length === 0) {
                containerAparelhos.innerHTML = '<p>Nenhum aparelho cadastrado ainda.</p>';
                return;
            }
            
            estado.aparelhos.forEach((aparelho, index) => {
                const consumoDiario = (aparelho.potencia * aparelho.horas_uso * aparelho.quantidade) / 1000;
                
                const div = document.createElement('div');
                div.className = 'appliance-item';
                div.innerHTML = `
                    <div class="appliance-header">
                        <div class="appliance-name">${aparelho.nome}</div>
                        <button class="remove-btn" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="appliance-details">
                        <p><strong>Potência:</strong> ${aparelho.potencia} W</p>
                        <p><strong>Uso diário:</strong> ${aparelho.horas_uso} horas</p>
                        <p><strong>Quantidade:</strong> ${aparelho.quantidade}</p>
                        <p class="consumption"><strong>Consumo diário:</strong> ${consumoDiario.toFixed(2)} kWh</p>
                    </div>
                `;
                
                containerAparelhos.appendChild(div);
            });
            
            // Adicionar eventos aos botões de remover
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    estado.aparelhos.splice(index, 1);
                    renderizarAparelhos();
                    mostrarNotificacao('Aparelho removido com sucesso!', 'sucesso');
                });
            });
        }

        // Gerar relatório
        btnGerarRelatorio.addEventListener('click', async () => {
            if (!estado.usuario) {
                mostrarNotificacao('Cadastre um usuário primeiro!', 'erro');
                document.querySelector('[data-tela="cadastro"]').click();
                return;
            }
            
            if (estado.aparelhos.length === 0) {
                mostrarNotificacao('Adicione pelo menos um aparelho!', 'erro');
                document.querySelector('[data-tela="aparelhos"]').click();
                return;
            }
            
            try {
                // Buscar relatório via API
                const relatorio = await buscarRelatorioAPI(estado.usuario.id || 1);
                estado.relatorio = relatorio;
                
                // Atualizar a interface com os dados do relatório
                document.getElementById('consumo-mensal').textContent = `${relatorio.consumoMensal} kWh`;
                document.getElementById('custo-mensal').textContent = `R$ ${relatorio.custoMensal}`;
                document.getElementById('emissao-co2').textContent = `${relatorio.emissaoCO2} kg`;
                
                // Renderizar recomendações
                renderizarRecomendacoes(relatorio.recomendacoes);
                
                mostrarNotificacao('Relatório gerado com sucesso!', 'sucesso');
            } catch (error) {
                console.error('Erro ao gerar relatório:', error);
                mostrarNotificacao('Erro ao gerar relatório. Tente novamente.', 'erro');
            }
        });

        // Gerar recomendações baseadas no consumo
        function gerarRecomendacoes(aparelhos, consumoTotal) {
            const recomendacoes = [];
            
            if (consumoTotal > 300) {
                recomendacoes.push({
                    titulo: "Consumo elevado",
                    descricao: "Seu consumo está acima da média residencial. Considere reduzir o uso de aparelhos de alto consumo como chuveiro elétrico e ar-condicionado."
                });
            }
            
            // Verificar aparelhos com alto consumo
            aparelhos.forEach(aparelho => {
                const consumoDiario = (aparelho.potencia * aparelho.horas_uso * aparelho.quantidade) / 1000;
                
                if (consumoDiario > 5) {
                    recomendacoes.push({
                        titulo: `Reduza o uso do ${aparelho.nome}`,
                        descricao: `Este aparelho consome ${consumoDiario.toFixed(2)} kWh por dia. Tente reduzir o tempo de uso ou buscar alternativas mais eficientes.`
                    });
                }
                
                if (aparelho.potencia > 1500) {
                    recomendacoes.push({
                        titulo: `Substitua o ${aparelho.nome}`,
                        descricao: `Aparelhos com potência acima de 1500W consomem muita energia. Considere substituí-lo por um modelo mais eficiente.`
                    });
                }
            });
            
            // Recomendações gerais
            recomendacoes.push({
                titulo: "Use lâmpadas LED",
                descricao: "Substitua lâmpadas incandescentes ou fluorescentes por LED, que consomem até 80% menos energia."
            });
            
            recomendacoes.push({
                titulo: "Aproveite a luz natural",
                descricao: "Abra cortinas e persianas durante o dia para reduzir o uso de iluminação artificial."
            });
            
            if (aparelhos.some(a => a.nome.toLowerCase().includes('ar condicionado'))) {
                recomendacoes.push({
                    titulo: "Use o ar-condicionado com moderação",
                    descricao: "Mantenha a temperatura em 23-24°C e feche portas e janelas quando o aparelho estiver ligado."
                });
            }
            
            return recomendacoes;
        }

        // Renderizar recomendações
        function renderizarRecomendacoes(recomendacoes) {
            const container = document.getElementById('recomendacoes-container');
            container.innerHTML = '';
            
            if (!recomendacoes || recomendacoes.length === 0) {
                container.innerHTML = '<p>Não há recomendações disponíveis no momento.</p>';
                return;
            }
            
            recomendacoes.forEach(recomendacao => {
                const div = document.createElement('div');
                div.className = 'recommendation';
                div.innerHTML = `
                    <i class="fas fa-lightbulb"></i>
                    <div>
                        <h4>${recomendacao.titulo}</h4>
                        <p>${recomendacao.descricao}</p>
                    </div>
                `;
                
                container.appendChild(div);
            });
        }

        // Dados iniciais para demonstração
        function inicializarDadosDemo() {
            // Dados de exemplo para demonstração
            estado.aparelhos = [
                { id: 1, nome: "Geladeira", potencia: 150, horas_uso: 24, quantidade: 1 },
                { id: 2, nome: "TV LED 42\"", potencia: 80, horas_uso: 5, quantidade: 1 },
                { id: 3, nome: "Lâmpada LED", potencia: 9, horas_uso: 8, quantidade: 6 }
            ];
            
            renderizarAparelhos();
            
            // Preencher formulário de usuário com dados de exemplo
            document.getElementById('nome').value = "Maria Silva";
            document.getElementById('email').value = "maria.silva@email.com";
            document.getElementById('telefone').value = "(98) 99999-9999";
            document.getElementById('endereco').value = "Rua das Flores, 123 - São Luís, MA";
        }

        // Inicializar a aplicação
        document.addEventListener('DOMContentLoaded', () => {
            inicializarDadosDemo();
        });