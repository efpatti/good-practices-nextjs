"use client";
import { useEffect, useRef, useState } from "react";

// Definição do tipo Product com título e descrição
type Product = {
 title: string;
 description: string;
};

export default function Home() {
 // Estado para armazenar produtos (title e description)
 const [items, setItems] = useState<Product[]>([]);

 // Estado para controlar o filtro de pesquisa
 const [filter, setFilter] = useState<string>("");

 // Referências para os inputs de título e descrição
 const inputTitle = useRef<HTMLInputElement>(null);
 const inputDescription = useRef<HTMLInputElement>(null);

 // Efeito de debug, que pode ser removido após o desenvolvimento
 useEffect(() => {
  console.log("refresh");
 });

 // Função para adicionar um novo produto
 const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Previne o comportamento padrão (recarregar a página)

  // Verifica se os campos de entrada estão preenchidos
  if (!inputTitle.current || !inputDescription.current) return;

  // Adiciona um novo produto à lista de produtos
  const newProduct: Product = {
   title: inputTitle.current.value,
   description: inputDescription.current.value,
  };

  setItems((prev) => [...prev, newProduct]);
  inputTitle.current.value = "";
  inputDescription.current.value = "";
 };

 // Função para filtrar os itens com base no título ou descrição
 const filteredItems = items.filter(
  (item) =>
   item.title.toLowerCase().includes(filter.toLowerCase()) ||
   item.description.toLowerCase().includes(filter.toLowerCase()),
 );

 return (
  <div className="min-h-screen bg-gradient-to-r from-purple-600 to-purple-800 p-8 font-sans">
   <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-8">
    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Gestão de Produtos</h1>

    {/* Campo de pesquisa */}
    <div className="mb-6 flex items-center justify-center">
     <input
      type="text"
      value={filter}
      onChange={(e) => setFilter(e.currentTarget.value)} // Atualiza o filtro
      placeholder="Procurar produto..."
      className="w-3/4 p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
     />
    </div>

    {/* Formulário de adição de produto */}
    <form className="grid grid-cols-2 gap-6" onSubmit={handleAddProduct}>
     <div className="flex flex-col space-y-4">
      <label htmlFor="productTitle" className="text-lg font-medium text-gray-700">
       Título do Produto
      </label>
      <input
       type="text"
       id="productTitle"
       ref={inputTitle}
       className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
       placeholder="Digite o título do produto"
      />

      <label htmlFor="productDescription" className="text-lg font-medium text-gray-700">
       Descrição do Produto
      </label>
      <input
       type="text"
       id="productDescription"
       ref={inputDescription}
       className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
       placeholder="Digite a descrição do produto"
      />

      <button
       type="submit"
       className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 rounded-lg shadow-md hover:from-purple-600 hover:to-indigo-500 transition duration-300"
      >
       Adicionar Produto
      </button>
     </div>

     {/* Exibição dos produtos */}
     <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-semibold text-gray-700">Lista de Produtos</h2>

      {/* Lista filtrada */}
      <ul className="space-y-2">
       {filteredItems.map((item, index) => (
        <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
         <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
         <p className="text-gray-600">{item.description}</p>
        </li>
       ))}
      </ul>
     </div>
    </form>
   </div>
  </div>
 );
}
