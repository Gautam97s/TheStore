'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getFiles } from '@/lib/actions/files.action'
import { Models } from 'node-appwrite'
import { Thumbnail } from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import { useDebounce } from 'use-debounce'

// File document interface extending Models.Document
interface FileDocument extends Models.Document {
  types: FileType;
  name: string;
  url: string;
  extension: string;
  size: number;
  bucketFileId: string;
  owner: {
    firstName: string;
    lastName: string;
  };
  users?: string[];
}


const Search = () => {

  const [query, setQuery] = useState('')
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('query') || '';
  const [results, setResults] = useState<FileDocument[]>([])
  const [open, setOpen] = useState(false)
  const router = useRouter();
  const path = usePathname();
  const [debouncedQuery] = useDebounce(query, 300);


  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([])
        setOpen(false)
        return router.push(path.replace(searchParams.toString(), ""));
      }
      const files = await getFiles({ types: [], searchText: debouncedQuery })

      setResults(files.documents)
      setOpen(true)
    }

    fetchFiles()
  }, [debouncedQuery, path, router, searchParams])


  useEffect(() => {
    if (!searchQuery) {
      setQuery('')
    }
  }, [searchQuery])

  const handleClickItem = (file: FileDocument) => {
    setOpen(false);
    setResults([]);

    router.push(
      `/${file.types === "video" || file.types === "audio" ? "media" : file.types + "s"}?query=${query}`,
    );
  };

  return (
    <div className="search">
      <div className="search-input-wrapper">
        <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search..."
          className="search-input bg-transparent border-none"
          onChange={(e) => setQuery(e.target.value)}
        />

        {open && (
          <ul className="search-result">
            {results.length > 0 ? (
              results.map((file) => (
                <li
                  className="flex items-center justify-between"
                  key={file.$id}
                  onClick={() => handleClickItem(file)}
                >
                  <div className="flex cursor-pointer items-center gap-4">
                    <Thumbnail
                      type={file.types}
                      extension={file.extension}
                      url={file.url}
                      className="size-9 min-w-9"
                    />
                    <p className="subtitle-2 line-clamp-1 text-light-100">
                      {file.name}
                    </p>
                  </div>

                  <FormattedDateTime
                    date={file.$createdAt}
                    className="caption line-clamp-1 text-light-200"
                  />
                </li>
              ))
            ) : (
              <p className="empty-result">No files found</p>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Search