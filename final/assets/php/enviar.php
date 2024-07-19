<?php
    include_once("../../../conecta.php");

    require 'vendor/autoload.php';
    
    use GuzzleHttp\Client;
    
    $client = new Client();
    
    $email = $_GET['email'];
    $cpf = $_GET['cpf'];

    $sql = "UPDATE `clientes` SET `cpf`='".$cpf."' WHERE email = '".$email."'";

    $executar = $conexao->prepare($sql);

    $executar->execute();

    $sql1 = "SELECT `nome`, `email`, `celular`, `endereco`, `cpf`, `valor`, `prazo`, `parcelas` FROM `clientes` WHERE cpf = '".$cpf."'";

    $result1 = $conexao->prepare($sql1);

    $result1->execute();

    $result1->store_result();

    if ($result1->num_rows > 0) {
        $result1->bind_result($nome, $email2, $celular, $endereco, $cpf2, $valor, $prazo, $parcelas);
        $result1->fetch();
    }

    $lista_endereco = explode(", ", $endereco);

    $numero = end($lista_endereco);

    try {
        $response = $client->request('POST', 'https://www.followize.com.br/api/v2/Leads', [
            'body' => '{
                "clientKey": "1708d31ed73c8b7f4802be6d3165279b",
                "teamKey": "22e79830e80e6e0fad0cb3bd0f7a15d1",
                "conversionGoal": "LP San Marco",
                "name": "'.$nome.'",
                "email": "'.$email2.'",
                "phone": "'.$celular.'",
                "message": "Valor do crédito: R$'.$valor.'\nPrazo: '.$prazo.' Meses",
                "hubUtmz": "utmcsr=LP San Marco|utmcct=Landing Page San Marco|",
                "addressLine1": "'.$lista_endereco[0].'",
                "addressNumber": "'.$numero.'",
                "country": "Brasil",
                "registrationNumber": "'.$cpf2.'",
                "legalBases": {
                "processing": {
                    "name": "consent",
                    "optIn": true
                },
                "communication": {
                    "name": "health_protection",
                    "optIn": true
                }
                }
            }',
            'headers' => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
            ],
          ]);

        $data = json_decode($response->getBody());

        header('Location: ../../../agradecimento/index.html');


    } catch (Exception $e) {
        echo 'Erro: ' . $e->getMessage();
    }
    
?>  


