// import { useState, useEffect, useMemo, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// // import { searchApi } from "../../../api/search.api";
// import { filterSearchResults } from "../../../utils/search.utils";
// import "./style.css";

// interface SearchModalProps {
//     onClose: () => void;
// }

// const SearchModal = ({ onClose }: SearchModalProps) => {
//     const [query, setQuery] = useState("");
//     const [data, setData] = useState<> | null>(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const navigate = useNavigate();

//     const filtered = useMemo(() => {
//         if (!data) return null;
//         return filterSearchResults(data, query);
//     }, [data, query]);

//     const fetchData = useCallback(async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             const result = await searchApi.getAll();
//             setData(result);
//         } catch (e) {
//             setError(e instanceof Error ? e.message : "Ошибка загрузки данных");
//         } finally {
//             setIsLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     useEffect(() => {
//         inputRef.current?.focus();
//     }, []);

//     useEffect(() => {
//         const handleEscape = (e: KeyboardEvent) => {
//             if (e.key === "Escape") onClose();
//         };
//         document.addEventListener("keydown", handleEscape);
//         document.body.style.overflow = "hidden";
//         return () => {
//             document.removeEventListener("keydown", handleEscape);
//             document.body.style.overflow = "unset";
//         };
//     }, [onClose]);

//     const handleResultClick = (path: string) => {
//         navigate(path);
//         onClose();
//     };
    

//     const handleOverlayClick = (e: React.MouseEvent) => {
//         if (e.target === e.currentTarget) onClose();
//     };

//     const hasResults =
//         filtered &&
//         query.trim() !== "" &&
//         (filtered.artists.length > 0 ||
//             filtered.paintings.length > 0 ||
//             filtered.exhibitions.length > 0);

//     return (
//         <div
//             className="search-modal-overlay"
//             role="dialog"
//             aria-modal="true"
//             aria-label="Поиск по сайту"
//             onClick={handleOverlayClick}
//         >
//             <div className="search-modal">
//                 <div className="search-modal__header">
//                     <input
//                         ref={inputRef}
//                         type="search"
//                         className="search-modal__input"
//                         placeholder="Поиск художников, картин, выставок..."
//                         value={query}
//                         onChange={(e) => setQuery(e.target.value)}
//                         autoComplete="off"
//                         aria-label="Поиск"
//                     />
//                     <button
//                         type="button"
//                         className="search-modal__close"
//                         aria-label="Закрыть поиск"
//                         onClick={onClose}
//                     >
//                         ✕
//                     </button>
//                 </div>
//                 <div className="search-modal__body">
//                     {isLoading && (
//                         <div className="search-modal__loading">
//                             Загрузка...
//                         </div>
//                     )}
//                     {error && (
//                         <div className="search-modal__error">{error}</div>
//                     )}
//                     {!isLoading && !error && hasResults && (
//                         <div className="search-modal__results">
//                             {filtered!.artists.length > 0 && (
//                                 <section className="search-modal__section">
//                                     <h3 className="search-modal__section-title">Художники</h3>
//                                     <ul className="search-modal__list">
//                                         {filtered!.artists.map((a) => (
//                                             <li key={a.id}>
//                                                 <button
//                                                     type="button"
//                                                     className="search-modal__item"
//                                                     onClick={() => handleResultClick(`/artists/${a.id}`)}
//                                                 >
//                                                     👤 {a.name} {a.surname}
//                                                 </button>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </section>
//                             )}
//                             {filtered!.paintings.length > 0 && (
//                                 <section className="search-modal__section">
//                                     <h3 className="search-modal__section-title">Картины</h3>
//                                     <ul className="search-modal__list">
//                                         {filtered!.paintings.map((p) => (
//                                             <li key={p.id}>
//                                                 <button
//                                                     type="button"
//                                                     className="search-modal__item"
//                                                     onClick={() => handleResultClick(`/gallery?painting=${p.id}`)}
//                                                 >
//                                                     🖼️ {p.title}
//                                                 </button>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </section>
//                             )}
//                             {filtered!.exhibitions.length > 0 && (
//                                 <section className="search-modal__section">
//                                     <h3 className="search-modal__section-title">Выставки</h3>
//                                     <ul className="search-modal__list">
//                                         {filtered!.exhibitions.map((e) => (
//                                             <li key={e.id}>
//                                                 <button
//                                                     type="button"
//                                                     className="search-modal__item"
//                                                     onClick={() => handleResultClick(`/exhibitions/${e.id}`)}
//                                                 >
//                                                     🏛️ {e.title}
//                                                 </button>
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </section>
//                             )}
//                         </div>
//                     )}
//                     {!isLoading && !error && query.trim() && !hasResults && (
//                         <div className="search-modal__empty">Ничего не найдено</div>
//                     )}
//                     {!isLoading && !error && !query.trim() && data && (
//                         <div className="search-modal__hint">
//                             Введите запрос для поиска по художникам, картинам и выставкам
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SearchModal;
