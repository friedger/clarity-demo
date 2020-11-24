(define-read-only (get-balance)
    (stx-get-balance tx-sender)
)

(define-public (pay (name (string-ascii 30)) (amount uint))
    (let ((owner 
        (unwrap-panic 
            (contract-call? 'ST2ZRX0K27GW0SP3GJCEMHD95TQGJMKB7G9Y0X1MH.dev-registry get-owner? name))))
        (stx-transfer? amount tx-sender owner)
    )
)